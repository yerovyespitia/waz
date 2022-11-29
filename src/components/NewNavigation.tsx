const NewNavigation = () => {
  return (
    <nav className="w-full h-16 flex justify-center items-center sticky top-0 left-0 bg-[#211D27] z-10">
      <ul className="flex flex-row justify-center items-center rounded-lg text-[#888888] border-[1px] border-[#555555]">
        <li className="cursor-pointer px-5 py-2 hover:text-white rounded-lg hover:bg-[#35313B] border-r-[1px] border-[#555555]">
          Home
        </li>
        <li className="cursor-pointer px-5 py-2 hover:text-white rounded-lg hover:bg-[#35313B] border-r-[1px] border-[#555555]">
          Populars
        </li>
        <li className="cursor-pointer px-5 py-2 hover:text-white rounded-lg hover:bg-[#35313B] border-r-[1px] border-[#555555]">
          Favorites
        </li>
        <li className="cursor-pointer px-5 py-2 hover:text-white rounded-lg hover:bg-[#35313B]">Library</li>
      </ul>
    </nav>
  )
}

export default NewNavigation
