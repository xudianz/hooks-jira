import qs from 'qs'
import * as Auth from 'auth-provider'
import { useAuth } from 'context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

interface FetchConfig extends RequestInit {
  data?: object,
  token?: string
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: FetchConfig = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`/${apiUrl}/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        await Auth.logout()
        window.location.reload()
        return Promise.reject('请重新登录')
      } 
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export const useHttp = () => {
  const { user } = useAuth()
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {
    ...config,
    token: user?.token
  })
}
