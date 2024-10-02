'use client'

import { People } from '@/types/People'
import * as api from '@/api/adminPeople'
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { InputField } from '../InputField'
import { escapeCPF } from '@/utils/escapeCPF'
import { Button } from '../Button'

type Props = {
  person: People
  refreshAction: () => void
}

export const PersonEdit = ({ person, refreshAction }: Props) => {
  const [nameField, setNameField] = useState(person.name)
  const [cpfField, setCpfField] = useState(person.cpf)
  const [errors, setErrors] = useState<ErrorItem[]>([])
  const [loading, setLoading] = useState(false)

  const personSchema = z.object({
    nameField: z.string().min(1, 'Preencha o nome'),
    cpfField: z.string().min(3, 'Preencha o cpf'),
  })

  useEffect(() => {
    setErrors([])
    const data = personSchema.safeParse({ nameField, cpfField })
    if (!data.success) return setErrors(getErrorFromZod(data.error))
  }, [nameField, cpfField])

  const handleSaveButton = async () => {
    if (errors.length > 0) return false

    setLoading(true)
    const updatedPerson = await api.updatePerson(
      person.id_event,
      person.id_group,
      person.id,
      {
        name: nameField,
        cpf: cpfField,
      },
    )
    setLoading(false)
    if (updatedPerson) {
      refreshAction()
    } else {
      alert('Ocorreu um erro')
    }
  }

  return (
    <div className="">
      <h4 className="text-xl">Editar Pessoa</h4>
      <InputField
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
        placeholder="Digite o nome da pessoa"
        errorMessage={errors.find((i) => i.field === 'nameField')?.message}
        disabled={loading}
      />
      <InputField
        value={cpfField}
        onChange={(e) => setCpfField(escapeCPF(e.target.value))}
        placeholder="Digite o cpf da pessoa"
        errorMessage={errors.find((i) => i.field === 'cpfField')?.message}
        disabled={loading}
      />
      <div className="flex gap-3">
        <Button
          value="Cancelar"
          onClick={() => refreshAction()}
          disabled={loading}
        />
        <Button
          value={loading ? 'Salvando...' : 'Salvar'}
          onClick={handleSaveButton}
          disabled={loading}
        />
      </div>
    </div>
  )
}
