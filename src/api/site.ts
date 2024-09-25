import { event } from '@/types/event'
import { req } from './axios'
import { SearchResult } from '@/types/SearchResult'

const getEvent = async (id: number): Promise<event | false> => {
  const json = await req.get(`events/${id}`)
  return (json.data.events as event) ?? false
}

const searchCPF = async (
  eventId: number,
  cpf: string,
): Promise<SearchResult | false> => {
  const json = await req.get(`/events/${eventId}/search?cpf=${cpf}`)
  if (json.data.person && json.data.personMatched)
    return json.data as SearchResult
  return false
}

export { getEvent, searchCPF }
