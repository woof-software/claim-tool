import * as Minio from 'minio';
import { requireEnvVar } from './requireEnvVar';

// Server side only
const STORAGE_ENDPOINT = requireEnvVar(
  'S3_STORAGE_ENDPOINT',
  process.env.S3_STORAGE_ENDPOINT,
);

const STORAGE_ACCESS_KEY = requireEnvVar(
  'S3_STORAGE_ACCESS_KEY',
  process.env.S3_STORAGE_ACCESS_KEY,
);

const STORAGE_SECRET_KEY = requireEnvVar(
  'S3_STORAGE_SECRET_KEY',
  process.env.S3_STORAGE_SECRET_KEY,
);

const STORAGE_BUCKET_NAME = requireEnvVar(
  'S3_STORAGE_BUCKET_NAME',
  process.env.S3_STORAGE_BUCKET_NAME,
);

const FILENAME_PREFIX = requireEnvVar(
  'RAILWAY_ENVIRONMENT_NAME',
  process.env.RAILWAY_ENVIRONMENT_NAME,
);

const storageClient = new Minio.Client({
  endPoint: STORAGE_ENDPOINT,
  accessKey: STORAGE_ACCESS_KEY,
  secretKey: STORAGE_SECRET_KEY,
  useSSL: true,
});

export const uploadFile = async (file: File) => {
  // Check if the bucket exists
  // If it doesn't, create it
  const exists = await storageClient.bucketExists(STORAGE_BUCKET_NAME);
  if (!exists) {
    await storageClient.makeBucket(STORAGE_BUCKET_NAME, 'us-east-1');
  }
  const metadata = {
    'Content-Type': file.type,
  };

  const buffer = Buffer.from(await file.arrayBuffer());
  return await storageClient.putObject(
    STORAGE_BUCKET_NAME,
    `${FILENAME_PREFIX}/${file.name}`,
    buffer,
    undefined,
    metadata,
  );
};

export const listFiles = async () =>
  new Promise<Minio.BucketItem[]>((resolve, reject) => {
    const objectsListTemp: Minio.BucketItem[] = [];
    const stream = storageClient.listObjectsV2(
      STORAGE_BUCKET_NAME,
      FILENAME_PREFIX,
      true,
    );

    stream.on('data', (obj) => {
      objectsListTemp.push(obj);
    });
    stream.on('error', reject);
    stream.on('end', () => {
      resolve(objectsListTemp);
    });
  });

export const getFile = async (fileName: string) =>
  new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    storageClient.getObject(STORAGE_BUCKET_NAME, fileName).then((stream) => {
      stream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      stream.on('end', () => {
        // Concat all the chunks in buffer to utf-8 string
        const concatBuffer = Buffer.concat(chunks);
        const content = concatBuffer.toString('utf-8');
        resolve(content);
      });
      stream.on('error', reject);
    });
  });

export const deleteFile = async (fileName: string) => {
  return await storageClient.removeObject(STORAGE_BUCKET_NAME, fileName);
};
