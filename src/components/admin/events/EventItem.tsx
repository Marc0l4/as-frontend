import { Event } from '@/types/EventType'
import { ItemButton } from '@/components/admin/ItemButton'
import { FaLink, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import * as api from '@/api/adminEvent'

type Props = {
  item: Event
  refreshAction: () => void
  openModal: (event: Event) => void
}

const EventItem = ({ item, refreshAction, openModal }: Props) => {
  const handleDeletButton = async () => {
    if (confirm('Tem certeza que deseja excluir esse evento?')) {
      await api.deleteEvent(item.id)
      refreshAction()
    }
  }

  const handleEditButton = () => openModal(item)

  return (
    <div className="m-3 flex flex-col items-center rounded-md border border-gray-800 p-3 md:flex-row">
      <div className="flex-1 text-xl md:text-base">{item.title}</div>
      <div className="mt-2 flex items-center gap-1 md:mt-0">
        {item.status && (
          <div className="rounded-md border border-dashed border-white">
            <ItemButton
              IconElement={FaLink}
              label="Link do evento"
              href={`/event/${item.id}`}
              target="blank"
            />
          </div>
        )}
        <ItemButton
          IconElement={FaRegEdit}
          label="editar"
          onClick={handleEditButton}
        />
        <ItemButton
          IconElement={FaRegTrashAlt}
          label="excluir"
          onClick={handleDeletButton}
        />
      </div>
    </div>
  )
}

const EventItemPlaceholder = () => {
  return (
    <div className="mb-3 h-16 w-full animate-pulse rounded-md border border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950"></div>
  )
}

const EventItemNotFound = () => {
  return (
    <div className="py-4 text-center text-gray-500">
      Não há eventos cadastrados
    </div>
  )
}

export { EventItemPlaceholder, EventItemNotFound, EventItem }
