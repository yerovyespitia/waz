import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"
import { invoke } from "@tauri-apps/api/tauri"
import { save } from "@tauri-apps/api/dialog"
import Image from "next/image"
import ditto from "../../assets/ditto.gif"
import back from "../../assets/back.svg"

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
  }, [id])

  return { episode, notExist }
}

const Episode = () => {
  const { episode, notExist } = useFetchData()
  const router = useRouter()

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
        <div className="flex flex-col items-center justify-center mt-36">
          <Image src={ditto} width={250} height={150} objectFit="cover" />
          <p className="text-white font-bold text-3xl mt-5">
            There was an error. Please try later.
          </p>
        </div>
      ) : (
        <>
          <Image
            src={back}
            width={30}
            height={30}
            className="cursor-pointer hover:scale-105"
            onClick={() => router.back()}
          />
          <video
            className="w-full"
            autoPlay={true}
            controls={true}
            src={episode}
          />
          <button onClick={() => handleDownload(episode)}>Download</button>
        </>
      )}
    </div>
  )
}

export default Episode
