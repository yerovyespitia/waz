import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"
import Image from "next/image"
import ditto from "../../assets/ditto.gif"
import { ReactNetflixPlayer } from "react-netflix-player"

const useFetchData = () => {
  const router = useRouter()
  const { id } = router.query
  const [episode, setEpisode] = useState("")
  const [notExist, setNotExist] = useState(true)

  const findBetterQuality = (data) => {
    // Find the best video quality available
    return (
      data.filter((video) => video.quality === "1080p")[0].url ||
      data.filter((video) => video.quality === "720p")[0].url ||
      data.filter((video) => video.quality === "default")[0].url ||
      data.filter((video) => video.quality === "backup")[0].url
    )
  }

  useEffect(() => {
    // Get episode of an anime
    // If this episode does exist sets notExist as false
    axios
      .get(`https://api.consumet.org/anime/gogoanime/watch/${id}`)
      .then((res) => {
        setEpisode(findBetterQuality(res.data.sources))
      })
      .finally(() => setNotExist(false))
  }, [id])

  return { episode, notExist, id, router }
}

const Episode = () => {
  const { episode, notExist, id, router } = useFetchData()
  const title = Array.from(id).join("").split("-").join(" ").toUpperCase()
  enum LanguagesPlayer {
    pt = "pt",
    en = "en",
  }

  // Loading screen
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
        <div className="flex flex-col items-center justify-center mt-36">
          <Image src={ditto} width={250} height={150} objectFit="cover" />
          <p className="text-white font-bold text-3xl mt-5">
            There was an error. Please try later.
          </p>
        </div>
      ) : (
        <ReactNetflixPlayer
          titleMedia={`${title}`}
          title={`${title}`}
          autoPlay={true}
          backButton={() => router.back()}
          playerLanguage={LanguagesPlayer.en}
          autoControllCloseEnabled={true}
          src={episode}
        />
      )}
    </div>
  )
}

export default Episode
