import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useFetchData = () => {
  const router = useRouter()
  const { id } = router.query
  const [episode, setEpisode] = useState("")

  useEffect(() => {
    axios
      .get(`https://api.consumet.org/anime/gogoanime/watch/${id}`)
      .then((res) => {
        setEpisode(res.data.sources.filter((x) => x.quality === "1080p")[0].url)
      })
  }, [])

  return { episode }
}

const Episode = () => {
  const { episode } = useFetchData()
  return (
    <div className="ml-52">
      <video className="w-full" autoPlay={true} controls={true} src={episode} />
    </div>
  )
}

export default Episode
