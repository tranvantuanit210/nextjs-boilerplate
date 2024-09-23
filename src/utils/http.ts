import httpStatusCode from '@/constants/httpStatusCode'
import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage
} from '@/lib/localStorage'
import { normalizeUrl } from '@/lib/utils'
import { LoginResType } from '@/schemaValidations/auth.schema'
import { HttpMethod } from '@/types/auth.type'
import { redirect } from 'next/navigation'

type CustomRequestInit = Omit<RequestInit, 'method'> & {
  baseUrl?: string
}

type EntityErrorPayload = {
  message: string
  errors: {
    field: string
    message: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload }: { status: number; payload: any }) {
    super(payload.message)
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: typeof httpStatusCode.UNPROCESSABLE_ENTITY
  payload: EntityErrorPayload
  constructor({
    status,
    payload
  }: {
    status: typeof httpStatusCode.UNPROCESSABLE_ENTITY
    payload: EntityErrorPayload
  }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

const isClient = () => typeof window !== 'undefined'
let clientLogoutRequest: null | Promise<any> = null
const request = async <Response>(method: HttpMethod, url: string, options?: CustomRequestInit) => {
  let body: FormData | string | undefined = undefined
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  const baseHeader: { [key: string]: string } =
    options?.body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json'
        }
  if (isClient()) {
    const accessToken = getAccessTokenFromLocalStorage()
    if (accessToken) {
      baseHeader.Authorization = `Bearer ${accessToken}`
    }
  }

  const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl
  const fullUrls = `${baseUrl}/${normalizeUrl(url)}`

  const res = await fetch(fullUrls, {
    ...options,

    headers: {
      ...baseHeader,
      ...options?.headers
    },
    body,
    method
  })
  const payload: Response = await res.json()

  const data = {
    status: res.status,
    payload
  }

  if (!res.ok) {
    if (res.status === httpStatusCode.UNPROCESSABLE_ENTITY) {
      throw new EntityError(
        data as {
          status: typeof httpStatusCode.UNPROCESSABLE_ENTITY
          payload: EntityErrorPayload
        }
      )
    } else if (res.status === httpStatusCode.UNAUTHORIZED) {
      if (isClient()) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: null,
            headers: {
              ...baseHeader
            }
          })

          try {
            await clientLogoutRequest
          } catch (error) {
            console.error('Error when logout', error)
          } finally {
            removeTokensFromLocalStorage()
            clientLogoutRequest = null
            location.href = '/login'
          }
        }
      } else {
        const accessToken = (options?.headers as any)?.Authorization?.split(' ')[1]
        redirect(`/logout?accessToken=${accessToken}`)
      }
    } else {
      throw new HttpError(data)
    }
  }

  if (isClient()) {
    const normalizePathUrl = normalizeUrl(url)
    if (['api/auth/login', 'api/guest/auth/login'].includes(normalizePathUrl)) {
      const { accessToken, refreshToken } = (payload as LoginResType).data
      setAccessTokenToLocalStorage(accessToken)
      setRefreshTokenToLocalStorage(refreshToken)
    } else if (['api/auth/logout', 'api/guest/auth/logout'].includes(normalizePathUrl)) {
      removeTokensFromLocalStorage()
    }
  }

  return data
}

const http = {
  get: <Response>(url: string, options?: CustomRequestInit) => request<Response>('GET', url, options),
  post: <Response>(url: string, body: any, options?: Omit<CustomRequestInit, 'body'>) =>
    request<Response>('POST', url, { ...options, body }),
  put: <Response>(url: string, body: any, options?: Omit<CustomRequestInit, 'body'>) =>
    request<Response>('PUT', url, { ...options, body }),
  delete: <Response>(url: string, options?: CustomRequestInit) => request<Response>('DELETE', url, options)
}

export default http
