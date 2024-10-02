import { getCookie } from 'cookies-next'
import { req } from './axios'
import { Event } from '../types/Event'

const login = async (password: string) => {
  // login
  try {
    const json = await req.post('/admin/login', { password })
    return (json.data.token as string) ?? false
  } catch (err) {
    return false
  }
}

const getEvents = async () => {
  const token = getCookie('token')
  const json = await req.get('/admin/events', {
    headers: { Authorization: `Token ${token}` },
  })
  return (json.data.events as Event[]) ?? []
}

type AddEventData = {
  title: string
  description: string
  grouped: boolean
}
const addEvent = async (data: AddEventData): Promise<Event | false> => {
  const token = getCookie('token')
  const json = await req.post('/admin/events', data, {
    headers: { Authorization: `Token ${token}` },
  })
  return (json.data.event as Event) ?? false
}

type UpdateEventData = {
  title?: string
  description?: string
  grouped?: boolean
  status?: boolean
}
const updateEvent = async (
  id: number,
  data: UpdateEventData,
): Promise<Event | false> => {
  const token = getCookie('token')
  const json = await req.put(`/admin/events/${id}`, data, {
    headers: { Authorization: `Token ${token}` },
  })
  return (json.data.event as Event) ?? false
}

const deleteEvent = async (id: number) => {
  const token = getCookie('token')
  const json = await req.delete(`/admin/events/${id}`, {
    headers: { Authorization: `Token ${token}` },
  })
  return !json.data.error
}

export { getEvents, login, deleteEvent, addEvent, updateEvent }
