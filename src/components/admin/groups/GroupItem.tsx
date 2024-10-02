import { Group } from '@/types/Group'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { ItemButton } from '../ItemButton'
import * as api from '@/api/adminGroup'

type Props = {
  item: Group
  refreshAction: () => void
  onEdit: (group: Group) => void
}

const GroupItem = ({ item, onEdit, refreshAction }: Props) => {
  const handleDeleteButton = async () => {
    if (confirm('Tem certeza que deseja excluir esse grupo?')) {
      console.log(item)
      await api.deleteGroup(item.id_event, item.id)
      refreshAction()
    }
  }

  return (
    <div className="mb-3 flex items-center rounded-md border border-gray-700 bg-gray-900 p-3">
      <div className="flex-1">{item.name}</div>
      <ItemButton IconElement={FaRegEdit} onClick={() => onEdit(item)} />
      <ItemButton IconElement={FaRegTrashAlt} onClick={handleDeleteButton} />
    </div>
  )
}

const GroupItemPlaceholder = () => {
  return (
    <div className="mb-3 h-16 w-full animate-pulse rounded-md border border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950"></div>
  )
}

const GroupItemNotFound = () => {
  return (
    <div className="py-4 text-center text-gray-500">
      Não há grupos cadastrados
    </div>
  )
}

export { GroupItem, GroupItemNotFound, GroupItemPlaceholder }
