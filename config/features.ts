import colors from 'tailwindcss/colors';
import {
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
  zksync,
  zksyncSepoliaTestnet,
} from 'wagmi/chains';

type WHITELABEL_ENV = 'OPTIMISM' | 'ZK_SYNC';

const _WHITELABEL_ENV = process.env.NEXT_PUBLIC_WHITELABEL_ENV;

if (!_WHITELABEL_ENV) {
  throw new Error('NEXT_PUBLIC_WHITELABEL_ENV is not set');
}

if (!(_WHITELABEL_ENV === 'OPTIMISM' || _WHITELABEL_ENV === 'ZK_SYNC')) {
  throw new Error('NEXT_PUBLIC_WHITELABEL_ENV is not set to a valid value');
}

export const WHITELABEL_ENV = _WHITELABEL_ENV;

interface Features {
  APP_NAME: string;
  DELEGATION_REQUIRED: boolean;
  DELEGATION_ENABLED: boolean;
  DELEGATES_URL?: string;
}

const featureMatrix: Record<WHITELABEL_ENV, Features> = {
  OPTIMISM: {
    APP_NAME: 'OP Claim Tool',
    DELEGATION_REQUIRED: false,
    DELEGATION_ENABLED: false,
    DELEGATES_URL: 'https://vote.optimism.io/delegates',
  },
  ZK_SYNC: {
    APP_NAME: 'ZKsync Claim Tool',
    DELEGATION_REQUIRED: true,
    DELEGATION_ENABLED: true,
    DELEGATES_URL: 'https://vote.optimism.io/delegates',
  },
};

export const FEATURES = featureMatrix[_WHITELABEL_ENV];

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('WalletConnect Project ID is not defined');
}

export const getChainConfig = () => {
  switch (WHITELABEL_ENV) {
    case 'OPTIMISM':
      return {
        appName: 'OP Claim Tool',
        chains: [mainnet, optimism, optimismSepolia, sepolia],
      };
    case 'ZK_SYNC':
      return {
        appName: 'ZKsync Claim Tool',
        chains: [mainnet, zksync, zksyncSepoliaTestnet],
      };
  }
};

interface WhitelabelThemeColors {
  bgClaimcardHeader: string;
  primaryAction: string;
  primaryActionButtonBg: string;
}

export const getWhitelabelThemeColors = (): WhitelabelThemeColors => {
  switch (WHITELABEL_ENV) {
    case 'OPTIMISM':
      return {
        bgClaimcardHeader: colors.red[200],
        primaryAction: colors.red[500],
        primaryActionButtonBg: colors.red[600],
      };
    case 'ZK_SYNC':
      return {
        bgClaimcardHeader: colors.blue[200],
        primaryAction: colors.blue[500],
        primaryActionButtonBg: colors.blue[900],
      };
  }
};
