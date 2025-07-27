/* eslint-disable no-console */

export function logError(error: Error, info: { componentStack?: string | null }) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Caught error:', error);
    console.log('Error details:', info);
  }
}
