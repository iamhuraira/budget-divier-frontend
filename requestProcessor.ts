import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface UseRequestProcessor {
  query: (key: any, queryFn: any, options?: any) => any
  mutate: (
    key: any,
    mutationFn: (values: any) => Promise<any>
  ) => {
    mutateAsync: (values: any) => Promise<any>
    isSuccess: boolean
    isError: boolean
    isLoading: boolean
  }
}

export function useRequestProcessor(): UseRequestProcessor {
  const queryClient = useQueryClient()

  const query = (key: any, queryFunction: any, options = {}) =>
    useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options
    })

  const mutate = (key: any, mutationFunction: any, options = {}) => {
    const mutation = useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: async () => {
        await queryClient.invalidateQueries(key)
      },
      ...options
    })

    return {
      mutateAsync: async (values: any) => {
        mutation.mutate(values)
        return await Promise.resolve(values)
      },
      isSuccess: mutation.status === 'success',
      isError: mutation.status === 'error',
      isLoading: mutation.status === 'pending'
    }
  }

  return { query, mutate }
}
