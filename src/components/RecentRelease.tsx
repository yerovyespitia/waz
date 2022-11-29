import axios from "axios"
import { useEffect, useState } from "react"

const useFetchData = () => {
  const [recent, setRecent] = useState([])

  useEffect(() => {
    axios
      .get("https://api.consumet.org/anime/gogoanime/recent-episodes")
      .then((res) => {
        setRecent(res.data.results)
      })
  }, [])

  return { recent }
}

const RecentRelease = () => {
  const { recent } = useFetchData()

  return (
    <div className="ml-[224px] p-5 grid grid-cols-app justify-center gap-3">
      {recent.map(({ id, title, image, url, episodeNumber }) => (
        <div
          className="text-center my-2 cursor-pointer hover:scale-105 transition-all group"
          key={id}
        >
          <img
            src={image}
            className="rounded-lg w-64 h-80 object-cover group-hover:border-2 group-hover:border-white"
            alt={title}
          />
          <p className="text-white text-lg font-bold mt-2">{title}</p>
          <p className="text-md text-gray-400 mt-1">Episode {episodeNumber}</p>
        </div>
      ))}
    </div>
  )
}

export default RecentRelease
