import Image from "next/image"
import Link from "next/link"
import home from "../assets/home.svg"
import populars from "../assets/populars.svg"
import favorites from "../assets/favorites.svg"
import downloaded from "../assets/downloaded.svg"
import settings from "../assets/settings.svg"

const Navigation = () => {
  return (
    <nav className="flex flex-col justify-center items-center fixed top-0 left-0 w-52 h-full transition-all bg-[#1A161F]">
      <ul className="flex flex-col gap-5 text-[#9D9D9D]">
        <Link href={"/"}>
          <div className="links">
            <Image src={home} width={16} height={16}></Image>
            <li>Home</li>
          </div>
        </Link>
        <Link href={"/populars"}>
          <div className="links">
            <Image src={populars} width={16} height={16}></Image>
            <li>Populars</li>
          </div>
        </Link>
        <Link href={"/favorites"}>
          <div className="links">
            <Image src={favorites} width={16} height={16}></Image>
            <li>Favorites</li>
          </div>
        </Link>
        <Link href={"/downloaded"}>
          <div className="links">
            <Image src={downloaded} width={16} height={16}></Image>
            <li>Downloads</li>
          </div>
        </Link>
        <Link href={"/settings"}>
          <div className="links">
            <Image src={settings} width={16} height={16}></Image>
            <li>Settings</li>
          </div>
        </Link>
      </ul>
    </nav>
  )
}

export default Navigation
