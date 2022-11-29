import Link from "next/link"

function App({ recent }) {
  return (
    <section className="ml-56">
      <h1 className="text-white sticky top-0 left-0 p-5 text-2xl font-semibold bg-[#1e1b21] z-10">
        New Episodes
      </h1>
      <div className="p-5 grid grid-cols-app justify-center gap-3">
        {recent.map(({ id, title, image, episodeNumber }) => (
          <Link href={`/watch/${id}-episode-${episodeNumber}`} key={id}>
            <div className="text-center my-2 cursor-pointer hover:scale-105 transition-all group">
              <img
                src={image}
                className="rounded-lg w-64 h-80 object-cover group-hover:border-2 group-hover:border-white"
                alt={title}
              />
              <p className="text-white text-lg font-bold mt-2">{title}</p>
              <p className="text-md text-gray-400 mt-1">
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
