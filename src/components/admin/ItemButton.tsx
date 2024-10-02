import Link from 'next/link'
import { IconType } from 'react-icons'

type Props = {
  IconElement: IconType
  label?: string
  onClick?: () => void
  href?: string
  target?: string
  replace?: boolean
}

export const ItemButton = ({
  IconElement,
  href,
  label,
  onClick,
  replace,
  target,
}: Props) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-2 p-3 md:flex-row">
      <div className="">
        <IconElement />
      </div>
      {label && <div>{label}</div>}
    </div>
  )

  return (
    <div className="rounded-md hover:bg-gray-800">
      {href && !onClick && (
        <Link href={href} target={target} replace={replace}>
          {content}
        </Link>
      )}
      {!href && onClick && (
        <div onClick={onClick} className="cursor-pointer">
          {content}
        </div>
      )}
    </div>
  )
}
