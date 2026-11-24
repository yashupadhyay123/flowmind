const BASE_URL = 'http://127.0.0.1:8000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.status === 204 ? null : res.json()
}

export const api = {
  getTasks: () => request('/tasks'),
  createTask: (data) =>
    request('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (id, data) =>
    request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteTask: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
  analyze: (text) =>
  request('/analyze', { method: 'POST', body: JSON.stringify({ text }) }),
getAnalyses: () => request('/analyze'),
getStats: () => request('/stats'),
saveSession: (minutes) =>
  request('/sessions', { method: 'POST', body: JSON.stringify({ minutes }) }),
  
}
