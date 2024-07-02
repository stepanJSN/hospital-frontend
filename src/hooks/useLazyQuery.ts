"use client"

import { UseQueryOptions, useQuery } from "@tanstack/react-query"

export default function useLazyQuery(options: UseQueryOptions) {
  const query = useQuery({
    ...options,
    enabled: false
  })

  return query
}