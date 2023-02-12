import { useRouter } from "next/router"
import ReactLoading from "react-loading"
import Image from "next/image"
import ditto from "../../assets/ditto.gif"
import { ReactNetflixPlayer } from "react-netflix-player"

export interface Episode {
  headers: Headers
  sources: Source[]
  download: string
}

export interface Headers {
  Referer: string
}

export interface Source {
  url: string
  isM3U8: boolean
  quality: string
}

const Episode = ({ episode }) => {
  const router = useRouter()
  const { id } = router.query
  const title = Array.from(id).join("").split("-").join(" ").toUpperCase()
  enum LanguagesPlayer {
    pt = "pt",
    en = "en",
  }

  // Loading screen
  if (typeof window === "undefined")
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
    <div className="ml-56">
      {!episode ? (
        <div className="mt-36 flex flex-col items-center justify-center">
          <Image src={ditto} width={250} height={150} objectFit="cover" />
          <p className="mt-5 text-3xl font-bold text-white">
            There was an error. Please try later.
          </p>
        </div>
      ) : (
        <ReactNetflixPlayer
          titleMedia={`${title}`}
          title={`${title}`}
          autoPlay={true}
          playerLanguage={LanguagesPlayer.en}
          autoControllCloseEnabled={true}
          src={episode}
        />
      )}
    </div>
  )
}

export default Episode

export const getServerSideProps = async (context) => {
  const id = context.params.id
  const episodeRes = await fetch(
    `https://api.consumet.org/anime/gogoanime/watch/${id}`
  )
  const data: Episode = await episodeRes.json()

  // Find the best video quality available
  const episode =
    data.sources.filter((video) => video.quality === "1080p")[0].url ||
    data.sources.filter((video) => video.quality === "720p")[0].url ||
    data.sources.filter((video) => video.quality === "default")[0].url ||
    data.sources.filter((video) => video.quality === "backup")[0].url

  return {
    props: {
      episode,
    },
  }
}
