import { PaginationParams } from '@/types'

export const defaultPaginationParams: PaginationParams = {
  page: 1,
  pageSize: 10
} as const

export const defaultTotalCount: number = 0 as const
export const defaultPageCount: number = 1 as const
