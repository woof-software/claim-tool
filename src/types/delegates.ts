export type getDelegatesResponse = {
  data: GetDelegates200;
  status: number;
};

export interface Issue {
  type?: string;
  value?: string;
}

export type OffsetParamParameter = number;
export type LimitParamParameter = number;
export const GetDelegatesSort = {
  most_delegators: 'most_delegators',
  weighted_random: 'weighted_random',
} as const;

export type GetDelegatesSort =
  (typeof GetDelegatesSort)[keyof typeof GetDelegatesSort];

export type GetDelegatesParams = {
  limit?: LimitParamParameter;
  offset?: OffsetParamParameter;
  sort?: GetDelegatesSort;
};

export interface TopStakeholder {
  type: string;
  value: string;
}

export interface DelegatePayload {
  email: string;
  daoSlug: string;
  discord: string;
  twitter: string;
  warpcast: string;
  topIssues: Issue[];
  topStakeholders: TopStakeholder[];
  agreeCodeConduct: boolean;
  delegateStatement: string;
  mostValuableProposals: string[];
  leastValuableProposals: string[];
  openToSponsoringProposals: null | boolean;
}

export interface DelegateSignature {
  signature: string;
  payload: DelegatePayload;
  twitter: string;
  discord: string;
  created_at: string;
  updated_at: string;
  warpcast: string;
  endorsed: boolean;
}

export type DelegateVotingPower = {
  advanced?: string;
  direct?: string;
  total?: string;
};

export interface Delegate {
  address: string;
  votingPower: DelegateVotingPower;
  citizen: boolean;
  statement: DelegateSignature;
}

export interface PageMetadata {
  has_next?: boolean;
  next_offset?: number;
  total_returned?: number;
}

export type GetDelegates200 = {
  data?: Delegate[];
  metadata?: PageMetadata;
};
