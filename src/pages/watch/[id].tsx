import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"
import { invoke } from "@tauri-apps/api/tauri"
import { save } from "@tauri-apps/api/dialog"

const useFetchData = () => {
  const router = useRouter()
  const { id } = router.query
  const [episode, setEpisode] = useState("")
  const [notExist, setNotExist] = useState(true)

  const findBetterQuality = (data) => {
    return (
      data.filter((video) => video.quality === "1080p")[0].url ||
      data.filter((video) => video.quality === "720p")[0].url ||
      data.filter((video) => video.quality === "default")[0].url ||
      data.filter((video) => video.quality === "backup")[0].url
    )
  }

  useEffect(() => {
    axios
      .get(`https://api.consumet.org/anime/gogoanime/watch/${id}`)
      .then((res) => {
        setEpisode(findBetterQuality(res.data.sources))
      })
      .finally(() => setNotExist(false))
  }, [])

  return { episode, notExist }
}

const Episode = () => {
  const { episode, notExist } = useFetchData()

  const handleDownload = async (url) => {
    try {
      const savePath = await save()
      if (!savePath) return
      await invoke("download_ep", {
        path: savePath,
        url: url,
      })
    } catch (error) {
      console.log(error)
    }
  }

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
      <button onClick={() => handleDownload(episode)}>Download</button>
    </div>
  )
}

export default Episode
