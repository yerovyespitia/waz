import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"
import Heart from "react-heart"

interface EpisodesTypes {
  id: string
  number: number
}

interface InfoTypes {
  id: string
  title: string
  image: string
  description: string
  releaseDate: string
  status: string
  subOrDub: string
  totalEpisodes: number
  episodes: EpisodesTypes[]
}

const useFetchData = () => {
  const router = useRouter()
  const { id } = router.query
  const [info, setInfo] = useState<InfoTypes[]>([])
  const [notExist, setNotExist] = useState(true)

  useEffect(() => {
    axios
      .get<InfoTypes>(`https://api.consumet.org/anime/gogoanime/info/${id}`)
      .then((res) => {
        setInfo([res.data])
      })
      .finally(() => setNotExist(false))
  }, [id])

  return { info, notExist }
}

const Anime = () => {
  const { info, notExist } = useFetchData()
  const [isClick, setClick] = useState(false)

  if (notExist)
    return (
      <div className="flex justify-center mt-56 ml-56 h-screen">
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
            <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start">
              <img
                src={image}
                className="rounded-lg w-64 h-96 object-cover"
                alt={title}
              />
              <div className="flex justify-center flex-col items-center lg:ml-4 lg:items-start">
                <div className="flex">
                  <h1 className="text-white text-center mr-3 text-4xl font-bold">
                    {title}
                  </h1>
                  <Heart
                    isActive={isClick}
                    inactiveColor={"white"}
                    activeColor={"#B52B4E"}
                    className="w-7"
                    onClick={() => setClick(!isClick)}
                  />
                </div>
                <div className="mt-4 flex gap-0 items-center sm:gap-4 flex-col sm:flex-row">
                  <p className="text-gray-400 text-lg font-medium">
                    {releaseDate}
                  </p>
                  <p className="text-gray-400 text-lg font-medium">
                    Episodes: {totalEpisodes}
                  </p>
                  <p className="text-gray-400 text-lg font-medium">
                    {subOrDub}
                  </p>
                  <p className="text-gray-400 text-lg font-medium">{status}</p>
                </div>
                <div className="mt-4 max-w-full lg:mr-4">
                  <p className="text-white text-md text-justify">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-ep justify-center items-center lg:justify-start gap-4">
              {episodes.map(({ id, number }) => (
                <Link href={`/watch/${id}`}>
                  <button className="bg-[#B52B4E] h-10 rounded text-white font-bold">
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
