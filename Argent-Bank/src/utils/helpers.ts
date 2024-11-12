
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { enqueueSnackbar } from 'notistack'

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown,
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

export function isApiError(
  error: unknown,
): error is { status : Number, data : {status : Number, message : string} } {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data != null &&
    'message' in error.data &&
    typeof (error as any).data.message === 'string'
  )
}

export function handleError(err : unknown){
  if (isFetchBaseQueryError(err)) {
    // you can access all properties of `FetchBaseQueryError` here
    const errMsg = 'error' in err ? err.error : JSON.stringify(err)
    enqueueSnackbar(errMsg, { variant: 'error' })

  } else if (isErrorWithMessage(err)) {
    console.log("isErrorWithMessage")
    // you can access a string 'message' property here
    enqueueSnackbar(err.message, { variant: 'error'})
  }
}