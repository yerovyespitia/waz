import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"

const useFetchData = () => {
  const router = useRouter()
  const { id } = router.query
  const [episode, setEpisode] = useState("")
  const [notExist, setNotExist] = useState(true)

  useEffect(() => {
    axios
      .get(`https://api.consumet.org/anime/gogoanime/watch/${id}`)
      .then((res) => {
        setEpisode(res.data.sources.filter((x) => x.quality === "720p")[0].url)
      })
      .finally(() => setNotExist(false))
  }, [])

  return { episode, notExist }
}

const Episode = () => {
  const { episode, notExist } = useFetchData()

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
    <div className="ml-56">
      {!episode ? (
        <div className="flex justify-center mt-56">
          <p className="text-white font-medium text-2xl">
            There was an error. Please try later.
          </p>
        </div>
      ) : (
        <video
          className="w-full"
          autoPlay={true}
          controls={true}
          src={episode}
        />
      )}
    </div>
  )
}

export default Episode
