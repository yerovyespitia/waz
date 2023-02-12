import Link from "next/link"

function App({ recent }) {
  return (
    <section className="ml-56">
      <h1 className="sticky top-0 left-0 z-10 bg-[#1e1b21] p-5 text-2xl font-semibold text-white">
        Weekly Releases
      </h1>
      <div className="grid grid-cols-app justify-center gap-8 p-5">
        {recent.map(({ id, title, image, episodeNumber }) => (
          <Link href={`/watch/${id}-episode-${episodeNumber}`} key={id}>
            <div
              className="group my-2 cursor-pointer text-center transition-all hover:scale-105"
              key={id}
            >
              <img
                src={image}
                className="h-[23rem] w-full rounded-lg object-cover text-center group-hover:border-2 group-hover:border-white"
                alt={title}
              />
              <p className="mt-2 text-center text-lg font-bold text-white">
                {title}
              </p>
              <p className="text-md mt-1 text-gray-400">
                Episode {episodeNumber}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default App

export const getStaticProps = async () => {
  // Get recent episodes available
  const res = await fetch(
    "https://api.consumet.org/anime/gogoanime/recent-episodes"
  )
  const recent = await res.json()

  return {
    props: {
      recent: recent.results,
    },
  }
}
