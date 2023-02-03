import Link from "next/link"

const Populars = ({ populars }) => {
  return (
    <section className="ml-56">
      <h1 className="sticky top-0 left-0 z-10 bg-[#1e1b21] p-5 text-2xl font-semibold text-white">
        Popular Animes
      </h1>
      <div className="grid grid-cols-app justify-center gap-8 p-5">
        {populars.map(({ id, title, image }) => (
          <Link href={`/anime/${id}`} key={id}>
            <div className="group my-2 cursor-pointer text-center transition-all hover:scale-105">
              <img
                src={image}
                className="h-[23rem] w-full rounded-lg object-cover group-hover:border-2 group-hover:border-white"
                alt={title}
              />
              <p className="mt-2 text-lg font-bold text-white">{title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Populars

export const getStaticProps = async () => {
  // Get top airing animes available
  const res = await fetch("https://api.consumet.org/anime/gogoanime/top-airing")
  const populars = await res.json()

  return {
    props: {
      populars: populars.results,
    },
  }
}
