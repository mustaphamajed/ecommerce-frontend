export type MutationToastMeta = {
  successMessage?: string
  errorMessage?: string
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: MutationToastMeta
  }
}
