import { Navigate } from 'react-router-dom';
import { Button } from '../components/button';

type ErrorHandlerProps = {
  error: Error;
  resetErrorBoundary?: (...args: any[]) => void;
};

export function ErrorHandler(props: ErrorHandlerProps) {
  const { error, resetErrorBoundary } = props;

  if ((error as any)?.response?.status === 404) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <h3>Something went wrong.</h3>
      {process.env.NODE_ENV === 'development' && (
        <>
          <ul className="error-messages">
            <li key={error.message}>{error.message}</li>
          </ul>

          <pre>{error.stack}</pre>
        </>
      )}
      <Button type="button" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}
