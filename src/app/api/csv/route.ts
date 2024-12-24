import crypto from 'node:crypto';
import { verifySignature } from '@/lib/verifySignature';
import { type NextRequest, NextResponse } from 'next/server';

import { parseCsvContent } from '@/lib/parseCsvContent';
import { requiredCsvColumns } from '../../../../config/storage';
import { deleteFile, listFiles, uploadFile } from '../../../lib/storage';

const verifyCsv = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const rows = parseCsvContent(buffer);
  const presentColumns = Object.keys(rows[0]);
  const missingColumns = requiredCsvColumns.filter(
    (column) => !presentColumns.includes(column),
  );

  if (missingColumns.length > 0) {
    throw new Error(
      `Invalid CSV file. Missing required columns: ${missingColumns.join(
        ', ',
      )}`,
    );
  }

  // Verify every row
  const invalidRows: number[] = [];
  rows.forEach((row, index) => {
    if (
      typeof row.UUID !== 'string' ||
      row.UUID === '' ||
      typeof row.Title !== 'string' ||
      row.Title === ''
    ) {
      invalidRows.push(index + 2);
    }
  });

  if (invalidRows.length > 0) {
    throw new Error(
      `Invalid CSV file. Invalid data in rows: ${invalidRows.join(', ')}`,
    );
  }
};

const addCsvToStorage = async (file: File) => {
  await uploadFile(file);
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const formData = await req.formData();

  const file = formData.get('file');
  const signature = formData.get('signature');
  const address = formData.get('address');

  if (!file) {
    return NextResponse.json(
      { error: 'No files received.', success: false },
      { status: 400 },
    );
  }

  // Check if it is a file
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'Invalid file', success: false },
      { status: 400 },
    );
  }

  // Check if it is a csv file
  if (file.type !== 'text/csv') {
    return NextResponse.json(
      { error: 'Invalid file type', success: false },
      { status: 400 },
    );
  }

  if (typeof signature !== 'string') {
    return NextResponse.json(
      { error: 'Invalid signature type (not string)', success: false },
      { status: 400 },
    );
  }

  if (typeof address !== 'string') {
    return NextResponse.json(
      { error: 'Invalid address type (not string)', success: false },
      { status: 400 },
    );
  }

  // Calculate sha-256 hash of the file
  const fileHash = await crypto.subtle
    .digest('SHA-256', await file.arrayBuffer())
    .then((arrayBuffer) => {
      return btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
    });

  // Verify the signature
  const verified = await verifySignature({
    types: {
      UploadFile: [{ name: 'hash', type: 'string' }],
    },
    primaryType: 'UploadFile',
    message: { hash: fileHash },
    signature: signature as `0x${string}`,
    address: address as `0x${string}`,
  });

  if (!verified) {
    return NextResponse.json(
      { error: 'Invalid signature', success: false },
      { status: 401 },
    );
  }

  // Check if the file is valid
  try {
    await verifyCsv(file);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.toString() : 'Unknown error',
        success: false,
      },
      { status: 400 },
    );
  }

  try {
    await addCsvToStorage(file);
    return NextResponse.json({ success: true, message: 'File uploaded' });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const files = await listFiles();
    return NextResponse.json({
      success: true,
      message: 'Successfully listed files',
      files,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const { signature, fileName, address } = await req.json();

    // Verify the signature
    const verified = await verifySignature({
      types: {
        DeleteFile: [{ name: 'fileName', type: 'string' }],
      },
      primaryType: 'DeleteFile',
      message: { fileName },
      address,
      signature,
    });

    if (!verified) {
      return NextResponse.json(
        { success: false, message: 'Could not verify signature' },
        { status: 401 },
      );
    }

    await deleteFile(fileName);
    return NextResponse.json({ success: true, message: 'File deleted' });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.toString() : 'Internal server error',
      },
      { status: 500 },
    );
  }
};
