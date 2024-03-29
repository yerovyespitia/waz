import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useFavoriteStore } from "../../store/favoriteStore"

const Favorites = () => {
  const [anime, setAnime] = useState([])
  const favorites = useFavoriteStore((state) => state.favorites)

  useEffect(() => {
    // Loop through favorite animes and get their info
    favorites.map((fav) =>
      axios
        .get(`https://api.consumet.org/anime/gogoanime/${fav}`)
        .then((res) => {
          setAnime((fav) => fav.concat(res.data.results[0]))
        })
    )
  }, [])

  return (
    <section className="ml-56">
      <h1 className="sticky top-0 left-0 z-10 bg-[#1e1b21] p-5 text-2xl font-semibold text-white">
        Favorites
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

export default Favorites
