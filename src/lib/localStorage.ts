import { TokenType } from '@/constants/tokenType.enum'

const isBrowser = typeof window !== 'undefined'

export const getAccessTokenFromLocalStorage = () => (isBrowser ? localStorage.getItem(TokenType.ACCESS_TOKEN) : null)

export const getRefreshTokenFromLocalStorage = () => (isBrowser ? localStorage.getItem(TokenType.REFRESH_TOKEN) : null)
export const setAccessTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem(TokenType.ACCESS_TOKEN, value)

export const setRefreshTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem(TokenType.REFRESH_TOKEN, value)
export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem(TokenType.ACCESS_TOKEN)
  isBrowser && localStorage.removeItem(TokenType.REFRESH_TOKEN)
}
