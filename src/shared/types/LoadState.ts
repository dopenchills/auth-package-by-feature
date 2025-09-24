export type LoadState<TData> =
  | { isLoading: true }
  | {
      isLoading: false
      data: TData
    }
