import { People } from '@/types/People'
import { ItemButton } from '../ItemButton'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import * as api from '@/api/adminPeople'

type Props = {
  item: People
  refreshAction: () => void
  onEdit: (person: People) => void
}

const PersonItem = ({ item, onEdit, refreshAction }: Props) => {
  const handleDeleteButton = async () => {
    if (confirm('Tem certeza que deseja excluir essa pessoa')) {
      await api.deletePerson(item.id_event, item.id_group, item.id)
      refreshAction()
    }
  }

  return (
    <div className="mb-3 flex items-center rounded-md border border-gray-700 bg-gray-900 p-3">
      <div className="flex-1">
        {item.name} (CPF: {item.cpf})
      </div>
      <ItemButton IconElement={FaRegEdit} onClick={() => onEdit(item)} />
      <ItemButton IconElement={FaRegTrashAlt} onClick={handleDeleteButton} />
    </div>
  )
}

const PersonItemPlaceholder = () => {
  return (
    <div className="mb-3 h-16 w-full animate-pulse rounded-md border border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950"></div>
  )
}

const PersonItemNotFound = () => {
  return (
    <div className="py-4 text-center text-gray-500">
      Não há pessoas neste grupo
    </div>
  )
}

export { PersonItem, PersonItemNotFound, PersonItemPlaceholder }
