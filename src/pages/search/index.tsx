import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { RootState } from "../../states/store"
import { useSelector } from "react-redux"

const useFetchData = () => {
  const { results } = useSelector((state: RootState) => state.input.value)
  const [anime, setAnime] = useState([])

  useEffect(() => {
    // Fetch and filter the animes (results) with text submited
    axios
      .get(`https://api.consumet.org/anime/gogoanime/${results}`)
      .then((res) => {
        setAnime(res.data.results)
      })
  }, [results, anime])

  return { anime }
}

const Search = () => {
  const { anime } = useFetchData()

  if (typeof anime === "undefined")
    return (
      <section className="ml-56">
        <h1 className="sticky top-0 left-0 z-10 bg-[#1e1b21] p-5 text-2xl font-semibold text-white">
          Search
        </h1>
      </section>
    )

  return (
    <section className="ml-56">
      <h1 className="sticky top-0 left-0 z-10 bg-[#1e1b21] p-5 text-2xl font-semibold text-white">
        Search
      </h1>
      <div className="grid grid-cols-app justify-center gap-8 p-5">
        {anime.map(({ id, title, image }) => (
          <Link href={`/anime/${id}`} key={id}>
            <div className="group my-2 cursor-pointer text-center transition-all hover:scale-105">
              <img
                src={image}
                className="h-[23rem] w-full rounded-lg object-cover group-hover:border-2 group-hover:border-white"
                alt={title}
              />
              <p className="mt-2 text-lg font-bold text-white">{title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Search
