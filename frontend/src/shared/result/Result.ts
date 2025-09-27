export type Success<T> = {
  isSuccess: true
  data: T
}

export type Failure<E> = {
  isSuccess: false
  error: E
}

export type Result<T, E = Error> = Success<T> | Failure<E>

export const ok = <T>(data: T): Success<T> => ({
  isSuccess: true,
  data,
})

export const err = <E>(error: E): Failure<E> => ({
  isSuccess: false,
  error,
})
