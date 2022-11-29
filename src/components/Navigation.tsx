import Image from "next/image"
import Link from "next/link"
import home from "../assets/home.svg"
import populars from "../assets/populars.svg"
import favorites from "../assets/favorites.svg"
import downloaded from "../assets/downloaded.svg"
import settings from "../assets/settings.svg"
import { useRouter } from "next/router"

const Navigation = () => {
  const router = useRouter()
  const { pathname } = router

  return (
    <nav className="flex flex-col justify-start items-center fixed top-0 left-0 w-56 h-full transition-all bg-[#1c1721]">
      <ul className="flex flex-col gap-5 text-[#9D9D9D] mt-8">
        <input
          className="rounded-md bg-[#262229] py-2 px-3 outline-none text-left"
          type="text"
          placeholder="Search"
        />
        <Link href={"/"}>
          <div
            className={
              pathname === "/"
                ? "links bg-[#262229]"
                : "links hover:bg-[#262229]"
            }
          >
            <Image src={home} width={16} height={16}></Image>
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
            <Image src={populars} width={16} height={16}></Image>
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
            <Image src={favorites} width={16} height={16}></Image>
            <li>Favorites</li>
          </div>
        </Link>
        <Link href={"/downloaded"}>
          <div
            className={
              pathname === "/downloaded"
                ? "links bg-[#262229]"
                : "links hover:bg-[#262229]"
            }
          >
            <Image src={downloaded} width={16} height={16}></Image>
            <li>Downloads</li>
          </div>
        </Link>
        <Link href={"/settings"}>
          <div
            className={
              pathname === "/settings"
                ? "links bg-[#262229]"
                : "links hover:bg-[#262229]"
            }
          >
            <Image src={settings} width={16} height={16}></Image>
            <li>Settings</li>
          </div>
        </Link>
      </ul>
    </nav>
  )
}

export default Navigation
