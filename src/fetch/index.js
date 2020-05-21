import { API_BASE_URL } from '../config'
import { normalizeResponseErrors } from '../utils'

export async function fetchGet(token, path) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const normalized = await normalizeResponseErrors(res)
  return await normalized.json()
}

export async function fetchPost(token, path, data) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const normalized = await normalizeResponseErrors(res)

  if (res.status !== 204) {
    return await normalized.json()
  }
}

export async function fetchPut(token, path, data) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const normalized = await normalizeResponseErrors(res)

  if (res.status !== 204) {
    return await normalized.json()
  }
}

export async function fetchPatch(token, path, data) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const normalized = await normalizeResponseErrors(res)

  if (res.status !== 204) {
    return await normalized.json()
  }
}

export async function fetchDelete(token, path) {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
  const normalized = await normalizeResponseErrors(res)
  if (res.status !== 204) {
    return await normalized.json()
  }
}
