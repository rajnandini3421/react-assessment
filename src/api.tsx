import axios from 'axios'

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: { name: string; url: string }
  location: { name: string; url: string }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface PaginatedResponse<T> {
  info: { count: number; pages: number; next: string | null; prev: string | null }
  results: T[]
}

const BASE = 'https://rickandmortyapi.com/api'

export const fetchCharacters = async (page = 1) => {
  const res = await axios.get<PaginatedResponse<Character>>(`${BASE}/character`, { params: { page } })
  return res.data
}

export const fetchCharacterById = async (id: number) => {
  const res = await axios.get<Character>(`${BASE}/character/${id}`)
  return res.data
}