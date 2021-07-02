import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://opentdb.com',
  headers: { 'Accept': 'application/json' }
})

const buildParams = (obj) => {
  const arr = []
  Object.keys(obj).forEach(k => {
    if (obj[k]) arr.push(`${k}=${obj[k]}`)
  })
  return arr.join('&')
}

const getQuizCategories = async () => {
  return await axiosInstance('/api_category.php')
}

const getQuestions = async (params) => {
  const urlParams = buildParams(params)
  const token = localStorage.getItem('token')
  return await axiosInstance(`/api.php?${urlParams}&token=${token}`)
}

const getApiToken = async () => {
  return await axiosInstance('/api_token.php?command=request')
}

const resetToken = async () => {
  const token = localStorage.getItem('token')
  return await axiosInstance(`/api_token.php?command=reset&token=${token}`)
}


export { getQuizCategories, getQuestions, getApiToken, resetToken }