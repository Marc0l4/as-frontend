import { SearchResult } from '@/types/SearchResult'

type Props = {
  results: SearchResult
}

export const SearchReveal = ({ results }: Props) => {
  return (
    <div className="">
      <p className="text-3xl">{results.person.name}</p>
      <p className="my-4 text-2xl">Parabens, você tirou:</p>
      <p className="my-5 rounded-lg border-2 border-dashed border-blue-300 bg-blue-800 px-5 py-16 text-4xl">
        {results.personMatched.name}
      </p>
    </div>
  )
}
