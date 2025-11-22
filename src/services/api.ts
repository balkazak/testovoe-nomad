import axios from 'axios'
import type { User } from '@/types/user'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
})

export const usersApi = {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users')
    return response.data
  },

  async getUser(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
  },

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, data)
    return response.data
  }
}

