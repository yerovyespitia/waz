import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const Favorites = () => {
  const [anime, setAnime] = useState([])
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  )

  useEffect(() => {
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
      <h1 className="text-white sticky top-0 left-0 p-5 text-2xl font-semibold bg-[#1e1b21] z-10">
        Favorites
      </h1>
      <div className="p-5 grid grid-cols-app justify-center gap-8">
        {anime.map(({ id, title, image }) => (
          <Link href={`/anime/${id}`} key={id}>
            <div className="text-center my-2 cursor-pointer hover:scale-105 transition-all group">
              <img
                src={image}
                className="rounded-lg w-full h-[23rem] object-cover group-hover:border-2 group-hover:border-white"
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

export default Favorites
