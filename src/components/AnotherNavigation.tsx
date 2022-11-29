const AnotherNavigation = () => {
  return (
    <nav className="w-full h-20 flex justify-center items-center absolute top-5 left-0 z-10">
      <ul className="flex flex-row rounded-full bg-black bg-opacity-40 backdrop-blur-3xl drop-shadow-lg">
        <li className="px-8 py-4 text-white hover:bg-white hover:rounded-full hover:text-black hover:scale-105 transition-all font-bold cursor-pointer">
          Home
        </li>
        <li className="px-8 py-4 text-white hover:bg-white hover:rounded-full hover:text-black hover:scale-105 transition-all font-bold cursor-pointer">
          Populars
        </li>
        <li className="px-8 py-4 text-white hover:bg-white hover:rounded-full hover:text-black hover:scale-105 transition-all font-bold cursor-pointer">
          Favorites
        </li>
        <li className="px-8 py-4 text-white hover:bg-white hover:rounded-full hover:text-black hover:scale-105 transition-all font-bold cursor-pointer">
          Downloads
        </li>
        <li className="px-8 py-4 text-white hover:bg-white hover:rounded-full hover:text-black hover:scale-105 transition-all font-bold cursor-pointer">
          Search
        </li>
      </ul>
    </nav>
  )
}

export default AnotherNavigation
