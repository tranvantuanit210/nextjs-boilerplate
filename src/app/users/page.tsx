'use client'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import path from '@/constants/path'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UserTable } from './user-table'
import { users as usersData } from '@/constants/data'
import { columns } from './columns'
import usePaginationParams from '@/hooks/usePaginationParams'
import { SearchParams } from '@/types'
import { defaultPageCount, defaultTotalCount } from '@/constants'

const breadcrumbItems = [{ title: 'Users', link: `${path.users}` }]

type UserPageProps = {
  searchParams: SearchParams
}

export default function UserPage({ searchParams }: UserPageProps) {
  const router = useRouter()
  const { page, pageSize } = usePaginationParams({ searchParams })
  // const { data, isLoading } = useQuery({
  //   queryKey: ['users', page, pageSize],
  //   queryFn: () => userApis.getUsers({ page, pageSize, bypassCache: true }),
  //   placeholderData: keepPreviousData
  // });
  const data: any = null

  const users = data?.payload.items || usersData
  const totalUsers = data?.payload.totalCount || defaultTotalCount
  const pageCount = Math.ceil(totalUsers / pageSize) || defaultPageCount
  return (
    <div className='space-y-4'>
      <Breadcrumbs items={breadcrumbItems} />

      <div className='flex items-start justify-between'>
        <Heading title={`Users (10)`} description='Manage users' />
        <Button className='text-xs md:text-sm' onClick={() => router.push(`/users/new`)}>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />

      <UserTable columns={columns} data={users} pageCount={pageCount} fallbackPage={page} fallbackPageSize={pageSize} />
    </div>
  )
}
