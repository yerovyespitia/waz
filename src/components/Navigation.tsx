import Image from "next/image"
import Link from "next/link"
import home from "../assets/home.svg"
import discovery from "../assets/discovery.svg"
import coming from "../assets/coming.svg"
import help from "../assets/help.svg"
import settings from "../assets/settings.svg"
import rated from "../assets/rated.svg"
import downloaded from "../assets/downloaded.svg"

const Navigation = () => {
  return (
    <nav className="flex flex-col justify-start items-start fixed top-0 left-0 w-56 h-full transition-all bg-[#1A161F]">
      <section className="mt-12 ml-5">
        <h3 className="font-light text-[#767676] mb-5 uppercase">Menu</h3>
        <ul className="flex flex-col gap-5 text-[#9D9D9D]">
          <Link href={"/"}>
            <div className="links">
              <Image src={home} width={16} height={16}></Image>
              <li>Home</li>
            </div>
          </Link>
          <Link href={"/"}>
            <div className="links">
              <Image src={discovery} width={16} height={16}></Image>
              <li>Discovery</li>
            </div>
          </Link>
          <Link href={"/"}>
            <div className="links">
              <Image src={coming} width={16} height={16}></Image>
              <li>Coming soon</li>
            </div>
          </Link>
        </ul>
      </section>
      <div className="border-[1px] self-center w-[185px] mt-8 rounded-full border-[#2A2930]"></div>
      <section className="mt-8 ml-5">
        <h3 className="font-light text-[#767676] mb-5 uppercase">Library</h3>
        <ul className="flex flex-col gap-5 text-[#9D9D9D]">
          <Link href={"/"}>
            <div className="links">
              <Image src={rated} width={16} height={16}></Image>
              <li>Top rated</li>
            </div>
          </Link>
          <Link href={"/"}>
            <div className="links">
              <Image src={downloaded} width={16} height={16}></Image>
              <li>Downloaded</li>
            </div>
          </Link>
        </ul>
      </section>
      <div className="border-[1px] self-center w-[185px] mt-8 rounded-full border-[#2A2930]"></div>
      <section className="mt-8 ml-5">
        <ul className="flex flex-col gap-5 text-[#9D9D9D]">
          <Link href={"/"}>
            <div className="links">
              <Image src={settings} width={16} height={16}></Image>
              <li>Settings</li>
            </div>
          </Link>
          <Link href={"/"}>
            <div className="links">
              <Image src={help} width={16} height={16}></Image>
              <li>Help</li>
            </div>
          </Link>
        </ul>
      </section>
    </nav>
  )
}

export default Navigation
