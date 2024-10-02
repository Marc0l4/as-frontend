import { Event } from '@/types/Event'
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod'
import { useEffect, useState } from 'react'
import { InputField } from '../InputField'
import { Button } from '../Button'
import { z } from 'zod'
import * as api from '@/api/adminEvent'

type Props = {
  event: Event
  refreshAction: () => void
}

export const EventTabInfo = ({ event, refreshAction }: Props) => {
  const [titleField, setTitleField] = useState(event.title)
  const [descriptionField, setDescriptionField] = useState(event.description)
  const [groupedField, setGroupedField] = useState(event.grouped)
  const [statusField, setStatusField] = useState(event.status)
  const [errors, setErrors] = useState<ErrorItem[]>([])
  const [loading, setLoading] = useState(false)

  const eventSchema = z.object({
    titleField: z.string().min(1, 'Preencha o titulo'),
    descriptionField: z.string().min(1, 'Preencha a descrição'),
    groupedField: z.boolean(),
    statusField: z.boolean(),
  })

  useEffect(() => {
    setErrors([])
    const data = eventSchema.safeParse({
      titleField,
      descriptionField,
      statusField,
      groupedField,
    })
    if (!data.success) setErrors(getErrorFromZod(data.error))
  }, [titleField, descriptionField, statusField, groupedField])

  const handleSaveButton = async () => {
    if (errors.length > 0) return false

    setLoading(true)
    const updatedEvent = await api.updateEvent(event.id, {
      title: titleField,
      description: descriptionField,
      grouped: groupedField,
      status: statusField,
    })
    setLoading(false)
    if (updatedEvent) {
      refreshAction()
    } else {
      alert('Não foi possivel sortear com esses grupos/pessoas')
    }
  }

  return (
    <div className="">
      <div className="mb-5">
        <label htmlFor="">Titulo</label>
        <InputField
          value={titleField}
          onChange={(e) => setTitleField(e.target.value)}
          placeholder="Digite o titulo do evento"
          errorMessage={
            errors.find((item) => item.field === 'titleField')?.message
          }
          disabled={loading}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="">Descrição</label>
        <InputField
          value={descriptionField}
          onChange={(e) => setDescriptionField(e.target.value)}
          placeholder="Digite a descrição do evento"
          errorMessage={
            errors.find((item) => item.field === 'descriptionField')?.message
          }
          disabled={loading}
        />
      </div>
      <div className="mb-5 flex">
        <div className="flex-1">
          <label>Agrupar Sorteio?</label>
          <input
            type="checkbox"
            className="mt-3 block h-5 w-5"
            checked={groupedField}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onChange={(e) => setGroupedField(!groupedField)}
            disabled={loading}
          />
        </div>
        <div className="flex-1">
          <label>Evento Liberado?</label>
          <input
            type="checkbox"
            className="mt-3 block h-5 w-5"
            checked={statusField}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onChange={(e) => setStatusField(!statusField)}
            disabled={loading}
          />
        </div>
      </div>
      <div className="">
        <Button
          value={loading ? 'Alterando Informações...' : 'Salvar'}
          onClick={handleSaveButton}
        />
      </div>
    </div>
  )
}
