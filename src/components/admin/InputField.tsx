import { ChangeEvent } from 'react'

type Props = {
  type?: 'text' | 'password'
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
}

export const InputField = ({
  onChange,
  value,
  disabled,
  errorMessage,
  placeholder,
  type,
}: Props) => {
  return (
    <div className="my-3 w-full">
      <input
        type={type || 'text'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`block w-full rounded-md border-b-2 bg-gray-900 p-3 text-lg text-white outline-none ${errorMessage ? 'border-red-600' : 'border-gray-900'} focus:border-white`}
      />
      {errorMessage && (
        <div className="text-right text-sm text-red-600">{errorMessage}</div>
      )}
    </div>
  )
}
