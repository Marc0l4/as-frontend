type Props = {
  value: string
  onClick: () => void
  disabled?: boolean
}

export const Button = ({ onClick, value, disabled }: Props) => {
  return (
    <button
      className="my-3 w-full rounded-md border-b-4 border-white/10 bg-gray-700 p-3 font-bold uppercase text-white hover:bg-gray-500 hover:transition-all hover:ease-in-out"
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}
