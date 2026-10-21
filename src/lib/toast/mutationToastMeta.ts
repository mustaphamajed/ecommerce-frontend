export type MutationToastMeta = {
  errorToast?: boolean
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: MutationToastMeta
  }
}
