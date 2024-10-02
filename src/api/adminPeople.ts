import { getCookie } from 'cookies-next'
import { req } from './axios'
import { People } from '@/types/People'

const getPeople = async (eventId: number, groupId: number) => {
  const token = getCookie('token')
  const json = await req.get(
    `/admin/events/${eventId}/groups/${groupId}/people`,
    {
      headers: { Authorization: `Token ${token}` },
    },
  )
  return (json.data.people as People[]) ?? []
}

type AddPersonData = {
  name: string
  cpf: string
}
const addPerson = async (
  eventId: number,
  groupId: number,
  data: AddPersonData,
): Promise<People | false> => {
  const token = getCookie('token')
  const json = await req.post(
    `/admin/events/${eventId}/groups/${groupId}/people`,
    data,
    {
      headers: { Authorization: `Token ${token}` },
    },
  )
  return (json.data.person as People) ?? false
}

type UpdatePersonData = {
  name?: string
  cpf?: string
}
const updatePerson = async (
  eventId: number,
  groupId: number,
  id: number,
  data: UpdatePersonData,
): Promise<People | false> => {
  const token = getCookie('token')
  const json = await req.put(
    `/admin/events/${eventId}/groups/${groupId}/people/${id}`,
    data,
    {
      headers: { Authorization: `Token ${token}` },
    },
  )
  return (json.data.person as People) ?? false
}

const deletePerson = async (eventId: number, groupId: number, id: number) => {
  const token = getCookie('token')
  const json = await req.delete(
    `/admin/events/${eventId}/groups/${groupId}/people/${id}`,
    {
      headers: { Authorization: `Token ${token}` },
    },
  )
  return !json.data.error
}

export { getPeople, addPerson, updatePerson, deletePerson }
