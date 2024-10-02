import { getCookie } from 'cookies-next'
import { req } from './axios'
import { Group } from '@/types/Group'

const getGroups = async (eventId: number) => {
  const token = getCookie('token')
  const json = await req.get(`/admin/events/${eventId}/groups`, {
    headers: { Authorization: `Token ${token}` },
  })
  return (json.data.groups as Group[]) ?? []
}

type AddGroupData = {
  name: string
}
const addGroup = async (
  eventId: number,
  data: AddGroupData,
): Promise<Group | false> => {
  const token = getCookie('token')
  const json = await req.post(`/admin/events/${eventId}/groups`, data, {
    headers: { Authorization: `Token ${token}` },
  })
  return (json.data.group as Group) ?? false
}

type UpdateGroupData = {
  name: string
}
const updateGroup = async (
  eventId: number,
  id: number,
  data: UpdateGroupData,
): Promise<Group | false> => {
  const token = getCookie('token')
  const json = await req.put(`/admin/events/${eventId}/groups/${id}`, data, {
    headers: { Authorization: `Token ${token}` },
  })
  return (json.data.group as Group) ?? false
}

const deleteGroup = async (eventId: number, id: number) => {
  const token = getCookie('token')
  const json = await req.delete(`/admin/events/${eventId}/groups/${id}`, {
    headers: { Authorization: `Token ${token}` },
  })
  return !json.data.error
}

export { getGroups, addGroup, updateGroup, deleteGroup }
