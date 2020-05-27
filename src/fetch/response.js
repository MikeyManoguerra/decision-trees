const normalizeResponseErrors = (res) => {
  if (!res.ok) {
    if (
      res.headers.has('content-type') &&
      res.headers.get('content-type').startsWith('application/json')
    ) {
      // We got a JSON error from our backend, let's decode it
      return res.json().then((err) => Promise.reject(err))
    }
    // Errors from backend are less informative
    return Promise.reject({
      code: res.status,
      message: res.statusText,
    })
  }
  return res
}



export async function handleResponse(res) {
  const normalized = await normalizeResponseErrors(res)

  if (res.status !== 204) {
    return await normalized.json()
  }
  return null
}
