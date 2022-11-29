import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

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
    return <p className="ml-56 text-white font-bold text-2xl">Loading...</p>

  return (
    <div className="ml-56">
      {!episode ? (
        <p className="text-white font-bold text-2xl">Not working</p>
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
