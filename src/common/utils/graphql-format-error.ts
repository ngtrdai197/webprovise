import { GraphQLFormattedError } from 'graphql';

export const graphqlFormattedError = (
  formattedError: GraphQLFormattedError,
  error: unknown,
) => {
  const graphQLFormattedError: GraphQLFormattedError = {
    message:
      (formattedError.extensions?.exception as any)?.response?.message ||
      (error as any)?.message,
  };
  return graphQLFormattedError;
};
