import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

type ResponseError = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;
type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryData = unknown, TData = TQueryData> = Omit<
  UseQueryOptions<TQueryData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

export { ResponseError, UseMutationCustomOptions, UseQueryCustomOptions };
