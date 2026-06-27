import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getArticles = async () => {
  const { data } = await api.get('/articles')
  return data
}

export const getArticleById = async (id) => {
  const { data } = await api.get(`/articles/${id}`)
  return data
}

export const getClusters = async () => {
  const { data } = await api.get('/articles/clusters')
  return data
}

export const getStatus = async () => {
  const { data } = await api.get('/articles/status')
  return data
}

export default api
