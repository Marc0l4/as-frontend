import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClose: () => void
}

export const Modal = ({ children, onClose }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex flex-col items-center overflow-y-auto bg-black/70">
      <div className="my-3 w-full max-w-xl">
        <div
          onClick={() => onClose()}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-lg text-white hover:bg-gray-700"
        >
          X
        </div>
      </div>
      <div className="mb-5 w-full max-w-xl rounded-md bg-gray-800 p-4">
        {children}
      </div>
    </div>
  )
}
