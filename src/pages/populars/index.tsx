import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const useFetchData = () => {
  const [populars, setPopulars] = useState([])

  useEffect(() => {
    axios
      .get("https://api.consumet.org/anime/gogoanime/top-airing")
      .then((res) => {
        setPopulars(res.data.results)
      })
  }, [])

  return { populars }
}

const Populars = () => {
  const { populars } = useFetchData()

  return (
    <section className="ml-56">
      <h1 className="text-white sticky top-0 left-0 p-5 text-2xl font-semibold bg-[#1e1b21] z-10">
        Popular Animes
      </h1>
      <div className="p-5 grid grid-cols-app justify-center gap-3">
        {populars.map(({ id, title, image, url }) => (
          <Link href={`/`} key={id}>
            <div className="text-center my-2 cursor-pointer hover:scale-105 transition-all group">
              <img
                src={image}
                className="rounded-lg w-64 h-80 object-cover group-hover:border-2 group-hover:border-white"
                alt={title}
              />
              <p className="text-white text-lg font-bold mt-2">{title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Populars
