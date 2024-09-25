import * as api from '@/api/site'
import { Search } from '@/components/site/Search'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

const Page = async ({ params }: Props) => {
  const eventItem = await api.getEvent(parseInt(params.id))
  // Verificando se o evento existe e está disponivel
  if (!eventItem || !eventItem.status) return redirect('/')

  return (
    <main className="mx-auto max-w-lg p-5 text-center">
      <header className="">
        <h2 className="text-2xl text-yellow-400">Amigo Secreto</h2>
        <h1 className="mb-2 mt-5 text-3xl">{eventItem.title}</h1>
        <p className="mb-5 text-sm">{eventItem.description}</p>
      </header>

      <Search id={eventItem.id} />

      <footer className="mt-5 text-sm">
        Criado pelo <br />
        <a href="https://www.linkedin.com/in/marco-junior-7781472a8/">
          Marco Junior
        </a>
      </footer>
    </main>
  )
}

export default Page
