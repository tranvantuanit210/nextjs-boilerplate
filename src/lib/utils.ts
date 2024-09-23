import { toast } from '@/hooks/use-toast'
import { EntityError } from '@/utils/http'
import { clsx, type ClassValue } from 'clsx'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeUrl(url: string) {
  return url.startsWith('/') ? url.slice(1) : url
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    const errors = error.payload.errors
    errors.forEach((error) => {
      setError(error.field, {
        type: 'server',
        message: error.message
      })
    })
  } else {
    toast({
      title: 'Error',
      description: error.payload?.message || 'Something went wrong',
      variant: 'destructive',
      duration: duration || 5000
    })
  }
}

export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  params: Record<string, string | number | null>
) => {
  const newSearchParams = new URLSearchParams(searchParams?.toString())

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newSearchParams.delete(key)
    } else {
      newSearchParams.set(key, String(value))
    }
  }

  return newSearchParams.toString()
}
