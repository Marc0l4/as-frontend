import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Amigo Secreto - Admin',
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <header className="bg-gray-800 py-5 text-center">
        <h3 className="text-3xl">Amigo Secreto</h3>
        <h4>Painel de Controle</h4>
      </header>
      <main className="mx-auto w-full max-w-3xl p-3">{children}</main>
    </div>
  )
}

export default Layout
