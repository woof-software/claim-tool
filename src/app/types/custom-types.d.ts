declare module '@wagmi/core' {
  export const cookieStorage: Storage;
  export const createStorage: (options: { storage: Storage }) => Storage;
  export const http: HttpClient;
}
