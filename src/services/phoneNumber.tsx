import axios from 'axios'

const API_KEY = 'e8f7bfbb0ed842e2983e32a0f35c99dd'

export async function validatePhoneNumber(phone: string)  {
  const url = `https://phonevalidation.abstractapi.com/v1/?api_key=${API_KEY}&phone=${encodeURIComponent(phone)}`
  const response = await axios.get(url)
  return response.data
}