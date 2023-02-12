import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactLoading from "react-loading"
import Heart from "../../assets/heart.svg"
import HeartFill from "../../assets/heart-fill.svg"

const Anime = ({ info }) => {
  const router = useRouter()
  const { id } = router.query
  // Favorite animes array added to localStorage
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  )

  useEffect(() => {
    // Keep favorites array from localStorage updated
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const setFavoritesFromLocalStorage = (param) => {
    // Change elements from favorites array from localStorage
    localStorage.setItem("favorites", JSON.stringify(param))
  }

  const handleOnClick = () => {
    // Add an anime to favorites when click (without duplicates)
    // Remove an anime from favorites when click again
    if (!favorites.includes(id)) {
      setFavorites((anime) => anime.concat(id))
    } else {
      let tempFavorites = favorites
      setFavorites(tempFavorites.filter((fav) => fav !== id))
      setFavoritesFromLocalStorage(tempFavorites.filter((fav) => fav !== id))
    }
  }

  // Loading screen
  if (!router.isReady)
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
              <img
                src={image}
                className="h-96 w-64 rounded-lg object-cover"
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
                        onClick={handleOnClick}
                      />
                    ) : (
                      <Image
                        src={HeartFill}
                        width={40}
                        height={40}
                        className="cursor-pointer"
                        onClick={handleOnClick}
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

export const getServerSideProps = async (context) => {
  const id = context.params.id
  // Get last episodes  available
  const res = await fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`)
  const info = await res.json()

  return {
    props: {
      info: info.results,
    },
  }
}
