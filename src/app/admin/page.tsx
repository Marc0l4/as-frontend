import * as api from '@/api/server'
import { AdminPage } from '@/components/admin/AdminPage'
import { redirect } from 'next/navigation'

const Page = async () => {
  const logged = await api.pingAdmin()
  // Verificando se esta logado, se não estiver é redirecionado para o login
  if (!logged) return redirect('/admin/login')

  return <AdminPage />
}

export default Page
