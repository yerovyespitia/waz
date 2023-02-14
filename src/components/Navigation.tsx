import Image from "next/image"
import Link from "next/link"
import home from "../assets/home.svg"
import populars from "../assets/populars.svg"
import favorites from "../assets/favorites.svg"
// import downloaded from "../assets/downloaded.svg"
// import settings from "../assets/settings.svg"
import { useRouter } from "next/router"
import { useInputStore } from "../store/inputStore"

const Navigation = () => {
  const router = useRouter()
  const { pathname } = router
  const searching = useInputStore((state) => state.searching)

  return (
    <nav className="fixed top-0 left-0 flex h-full w-56 flex-col items-center justify-start bg-[#1c1721] transition-all">
      <ul className="mt-8 flex flex-col gap-5 text-[#9D9D9D]">
        <Link href={"/search"}>
          <input
            className="rounded-md bg-[#262229] py-2 px-3 text-left outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => searching(e)}
          />
        </Link>
        <Link href={"/"}>
          <div
            className={
              pathname === "/"
                ? "links bg-[#262229]"
                : "links hover:bg-[#262229]"
            }
          >
            <Image src={home} width={16} height={16} />
            <li>Home</li>
          </div>
        </Link>
        <Link href={"/populars"}>
          <div
            className={
              pathname === "/populars"
                ? "links bg-[#262229]"
                : "links hover:bg-[#262229]"
            }
          >
            <Image src={populars} width={16} height={16} />
            <li>Populars</li>
          </div>
        </Link>
        <Link href={"/favorites"}>
          <div
            className={
              pathname === "/favorites"
                ? "links bg-[#262229]"
                : "links hover:bg-[#262229]"
            }
          >
            <Image src={favorites} width={16} height={16} />
            <li>Favorites</li>
          </div>
        </Link>
        {/* <Link href={"/downloaded"}>
          <div
            className={
              pathname === "/downloaded"
                ? "links bg-[#262229]"
                : "links hover:bg-[#262229]"
            }
          >
            <Image src={downloaded} width={16} height={16} />
            <li>Downloads</li>
          </div>
        </Link> */}
        {/* <Link href={"/settings"}>
          <div
            className={
              pathname === "/settings"
                ? "links bg-[#262229]"
                : "links hover:bg-[#262229]"
            }
          >
            <Image src={settings} width={16} height={16} />
            <li>Settings</li>
          </div>
        </Link> */}
      </ul>
    </nav>
  )
}

export default Navigation
