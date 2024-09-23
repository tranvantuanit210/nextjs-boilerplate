import { Icons } from '@/components/icon'

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
  role?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type PaginationResponse<T> = {
  items: T
  page: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type PaginationParams = {
  page: number
  pageSize: number
  bypassCache?: boolean
}

export type SearchParams = {
  [key: string]: string | string[] | undefined
}

export type IsSameTypee<T, U> = T extends U ? (U extends T ? true : false) : false
