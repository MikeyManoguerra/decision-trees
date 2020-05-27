export const generateAuthRetrieveHeaders = (method, token) => ({
  method,
  headers: { Authorization: `Bearer ${token}` }
})

export const generateRetrieveHeaders = (method) => ({
  method,
})

export const generateAuthContentHeaders = (method, token, data) => {
  const headers = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  }
  if (data) {
    headers['body'] = JSON.stringify(data)
  }

  return headers
}


export const generateContentHeaders = (method, data) => {
  const headers = {
    method,
    headers: {
      'content-type': 'application/json',
    },
  }
  if (data) {
    headers['body'] = JSON.stringify(data)
  }

  return headers
}
