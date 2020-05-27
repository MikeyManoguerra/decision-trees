import { API_BASE_URL } from '../config'
import { handleResponse } from './response'
import {
  generateContentHeaders,
  generateRetrieveHeaders,
  generateAuthContentHeaders,
  generateAuthRetrieveHeaders,
} from './headers'

export async function fetchAuthGet(token, path) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    ...generateAuthRetrieveHeaders('GET', token)
  })

  return await handleResponse(res)
}

export async function fetchGet(path) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    ...generateRetrieveHeaders('GET')
  })

  return await handleResponse(res)
}

export async function fetchAuthPost(token, path, data) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    ...generateAuthContentHeaders('POST', token, data),
  })

  return await handleResponse(res)
}

export async function fetchPost(path, data) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    ...generateContentHeaders('POST', data),
  })

  return await handleResponse(res)
}

export async function fetchAuthPut(token, path, data) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    ...generateAuthContentHeaders('PUT', token, data),
  })

  return await handleResponse(res)
}

export async function fetchAuthPatch(token, path, data) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    ...generateAuthContentHeaders('PATCH', token, data),
  })

  return await handleResponse(res)
}

export async function fetchAuthDelete(token, path) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    ...generateAuthRetrieveHeaders('DELETE', token)
  })

  return await handleResponse(res)
}
