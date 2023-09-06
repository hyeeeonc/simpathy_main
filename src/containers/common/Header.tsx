const Header = () => {
  return (
    <header className="w-full h-24 relative">
      <div className="h-20 flex justify-between items-center">
        <img
          className="w-40 cursor-pointer"
          src="/images/common/logo.png"
          alt="logo"
        />
      </div>
      <div className="absolute flex inset-x-0 bottom-0 h-3 bg-black">
        <div className="w-1/5 bg-sky-600"></div>
        <div className="w-4/5 bg-teal-500"></div>
      </div>
    </header>
  )
}

export default Header
