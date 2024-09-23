import { defaultPaginationParams } from '@/constants'
import { SearchParams } from '@/types'

export interface UsePaginationParamsProps {
  searchParams: SearchParams
}

export default function usePaginationParams({ searchParams }: UsePaginationParamsProps) {
  const page = Number(searchParams.page) || defaultPaginationParams.page
  const pageSize = Number(searchParams.limit) || defaultPaginationParams.pageSize

  return { page, pageSize }
}
