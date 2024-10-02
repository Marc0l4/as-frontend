'use client'

import * as apiEvent from '@/api/adminEvent'
import { Event } from '@/types/EventType'
import { useEffect, useState } from 'react'
import {
  EventItem,
  EventItemNotFound,
  EventItemPlaceholder,
} from '@/components/admin/events/EventItem'
import { ItemButton } from './ItemButton'
import { FaPlus } from 'react-icons/fa'
import { ModalScreens } from '@/types/ModalScreens'
import { Modal } from './Modal'
import { EventAdd } from './events/EventAdd'
import { EventEdit } from './events/EventEdit'

export const AdminPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [modalScreen, setModalScreen] = useState<ModalScreens>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event>()

  const loadEvents = async () => {
    setModalScreen(null)
    setLoading(true)
    const eventList = await apiEvent.getEvents()
    setLoading(false)
    setEvents(eventList)
  }

  const editEvent = (event: Event) => {
    setSelectedEvent(event)
    setModalScreen('edit')
  }

  useEffect(() => {
    loadEvents()
  }, [])

  return (
    <div className="">
      <div className="flex items-center p-3">
        <h1 className="flex-1 text-2xl">Eventos</h1>
        <ItemButton
          IconElement={FaPlus}
          onClick={() => setModalScreen('add')}
        />
      </div>
      <div className="my-3">
        {!loading &&
          events.length > 0 &&
          events.map((i) => (
            <div key={i.id} className="">
              <EventItem
                key={i.id}
                item={i}
                refreshAction={loadEvents}
                openModal={(event) => editEvent(event)}
              />
            </div>
          ))}
        {!loading && events.length === 0 && <EventItemNotFound />}
        {loading && (
          <>
            <EventItemPlaceholder />
            <EventItemPlaceholder />
          </>
        )}
      </div>
      {modalScreen && (
        <Modal onClose={() => setModalScreen(null)}>
          {modalScreen === 'add' && <EventAdd refreshAction={loadEvents} />}
          {modalScreen === 'edit' && (
            <EventEdit event={selectedEvent} refreshAction={loadEvents} />
          )}
        </Modal>
      )}
    </div>
  )
}
