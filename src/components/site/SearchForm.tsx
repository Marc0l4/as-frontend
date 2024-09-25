'use client'

import { escapeCPF } from '@/utils/escapeCPF'
import { useState } from 'react'

type Props = {
  onSearchButton: (cpf: string) => void
  loading: boolean
}

export const SearchForm = ({ onSearchButton, loading }: Props) => {
  const [cpfInput, setCpfInput] = useState('')

  return (
    <div className="">
      <p className="mb-3 text-xl">Qual seu CPF?</p>
      <input
        inputMode="numeric"
        type="text"
        placeholder="Digite seu CPF"
        className="w-full rounded-lg bg-white p-3 text-center text-2xl text-black outline-none disabled:opacity-20"
        autoFocus
        value={cpfInput}
        onChange={(e) => setCpfInput(escapeCPF(e.target.value))}
        disabled={loading}
      />
      <button
        className="mt-3 w-full rounded-lg border-b-4 border-l-4 border-blue-600 bg-blue-800 p-3 text-2xl text-white transition-all ease-in-out active:border-b-0 active:border-l-0 active:border-r-4 active:border-t-4 active:border-blue-600 active:transition-all active:ease-in-out"
        onClick={() => onSearchButton(cpfInput)}
        disabled={loading}
      >
        {loading ? 'Buscando' : 'Entrar'}
      </button>
    </div>
  )
}
