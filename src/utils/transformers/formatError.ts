import { GraphQLError } from 'graphql';

// Tipe untuk originalError
interface OriginalError {
  message?: string;
  statusCode?: number;
}

export const formatGraphQLError = (error: GraphQLError) => {
  const extensions = error.extensions || {};
  const originalError = extensions.originalError || {}; 

  const message =
    typeof originalError === 'object' && 'message' in originalError
      ? (originalError as OriginalError).message
      : error.message || 'An unexpected error occurred';

  const status =
    typeof originalError === 'object' && 'statusCode' in originalError
      ? (originalError as OriginalError).statusCode
      : 500;

  return {
    message,
    code: extensions.code || 'INTERNAL_SERVER_ERROR',
    status,
  };
};
