import Image from "next/image"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"
import Heart from "../../assets/heart.svg"
import HeartFill from "../../assets/heart-fill.svg"
import { useFavoriteStore } from "../../store/favoriteStore"

interface Info {
  id: string
  title: string
  url: string
  genres: string[]
  totalEpisodes: number
  image: string
  releaseDate: string
  description: string
  subOrDub: string
  type: string
  status: string
  otherName: string
  episodes: Episode[]
}

interface Episode {
  id: string
  number: number
  url: string
}

const useFetchData = () => {
  const router = useRouter()
  const { id } = router.query
  const [info, setInfo] = useState<Info[]>([])
  const [notExist, setNotExist] = useState(true)

  useEffect(() => {
    // Get animes info
    if (!router.isReady) return // avoid the undefined id issue
    axios
      .get<Info>(`https://api.consumet.org/anime/gogoanime/info/${id}`)
      .then((res) => {
        setInfo([res.data])
      })
  }, [id, router.isReady])

  return { info, notExist }
}

const Anime = () => {
  const { info, notExist } = useFetchData()
  const favorites = useFavoriteStore((state) => state.favorites)
  const addFavorite = useFavoriteStore((state) => state.addFavorite)
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite)

  // Loading screen
  if (!notExist)
    return (
      <div className="mt-56 ml-56 flex h-screen justify-center">
        <ReactLoading
          type={"spinningBubbles"}
          color={"white"}
          height={50}
          width={50}
        />
      </div>
    )

  return (
    <section className="ml-56 p-5">
      {info.map(
        ({
          id,
          title,
          image,
          description,
          releaseDate,
          status,
          subOrDub,
          totalEpisodes,
          episodes,
        }) => (
          <div key={id}>
            <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-start">
              <Image
                src={image}
                className="h-96 w-64 rounded-lg object-cover"
                width={256}
                height={384}
                alt={title}
              />
              <div className="flex flex-col items-center justify-center lg:ml-4 lg:items-start">
                <div className="flex">
                  <h1 className="mr-3 text-left text-4xl font-bold text-white">
                    {title}
                  </h1>
                  <>
                    {!favorites.includes(id) ? (
                      <Image
                        src={Heart}
                        width={40}
                        height={40}
                        className="cursor-pointer"
                        onClick={() => addFavorite(id)}
                        alt="Heart"
                      />
                    ) : (
                      <Image
                        src={HeartFill}
                        width={40}
                        height={40}
                        className="cursor-pointer"
                        onClick={() => removeFavorite(id)}
                        alt="Heart-fill"
                      />
                    )}
                  </>
                </div>
                <div className="mt-4 flex flex-col items-center gap-0 sm:flex-row sm:gap-4">
                  <p className="text-lg font-medium text-gray-400">
                    {releaseDate}
                  </p>
                  <p className="text-lg font-medium text-gray-400">
                    Episodes: {totalEpisodes}
                  </p>
                  <p className="text-lg font-medium text-gray-400">
                    {subOrDub}
                  </p>
                  <p className="text-lg font-medium text-gray-400">{status}</p>
                </div>
                <div className="mt-4 max-w-full lg:mr-4">
                  <p className="text-md text-justify text-white">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-ep items-center justify-center gap-4 lg:justify-start">
              {episodes.map(({ id, number }) => (
                <Link href={`/watch/${id}`} key={id}>
                  <button className="h-10 rounded bg-[#B52B4E] font-bold text-white">
                    Ep {number}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )
      )}
    </section>
  )
}

export default Anime
