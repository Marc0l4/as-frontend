'use client'

import { Event } from '@/types/EventType'
import { useState } from 'react'
import { EventTabInfo } from './EventTabInfo'
import { EventTabGroups } from '../groups/EventTabGroups'
import { EventTabPeople } from '../people/EventTabPeople'

type TabNames = 'info' | 'groups' | 'people'
type Props = {
  refreshAction: () => void
  event: Event | undefined
}

export const EventEdit = ({ refreshAction, event }: Props) => {
  if (!event) return

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tab, setTab] = useState<TabNames>('info')

  return (
    <div className="">
      <div className="flex cursor-pointer rounded-md border-b border-gray-500 text-center">
        <div
          onClick={() => setTab('info')}
          className={`flex-1 rounded-md p-3 hover:bg-gray-700 ${tab === 'info' ? 'bg-gray-600' : ''}`}
        >
          Informações
        </div>
        <div
          onClick={() => setTab('groups')}
          className={`flex-1 rounded-md p-3 hover:bg-gray-700 ${tab === 'groups' ? 'bg-gray-600' : ''}`}
        >
          Grupos
        </div>
        <div
          onClick={() => setTab('people')}
          className={`flex-1 rounded-md p-3 hover:bg-gray-700 ${tab === 'people' ? 'bg-gray-600' : ''}`}
        >
          Pessoas
        </div>
      </div>
      <div className="">
        {tab === 'info' && (
          <EventTabInfo event={event} refreshAction={refreshAction} />
        )}
        {tab === 'groups' && <EventTabGroups eventId={event.id} />}
        {tab === 'people' && <EventTabPeople eventId={event.id} />}
      </div>
    </div>
  )
}
