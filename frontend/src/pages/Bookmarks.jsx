import Header from "../components/Header"

function Bookmarks() {
  return (
    <>
      <div className="w-full md:w-600">

        <Header title="Bookmarks" />

        <div
          className="min-h-[92vh] border-b border-dim-200 cursor-pointer transition duration-350 ease-in-out pb-4 border-l border-r">
          <div
            className="text-blue-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
            <div className="flex flex-row justify-between p-2">
              <div className="flex flex-row">
                <img className="w-10 h-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg"
                  alt="Joe Biden" />
                <div className="flex flex-col ml-2">
                  <h1 className="text-white font-bold text-sm">
                    @PEPE
                  </h1>
                  <p className="text-gray-400 text-sm">$3,500,567</p>
                </div>
              </div>
              <div className="">
                <div className="flex items-center h-full text-white">
                  <a href="#"
                    className="text-xs font-bold text-red-400 px-4 py-1 rounded-full border-2 border-red-400">Remove</a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-blue-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
            <div className="flex flex-row justify-between p-2">
              <div className="flex flex-row">
                <img className="w-10 h-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg"
                  alt="Joe Biden" />
                <div className="flex flex-col ml-2">
                  <h1 className="text-white font-bold text-sm">
                    @PEPE
                  </h1>
                  <p className="text-gray-400 text-sm">$3,500,567</p>
                </div>
              </div>
              <div className="">
                <div className="flex items-center h-full text-white">
                  <a href="#"
                    className="text-xs font-bold text-red-400 px-4 py-1 rounded-full border-2 border-red-400">Remove</a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-blue-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
            <div className="flex flex-row justify-between p-2">
              <div className="flex flex-row">
                <img className="w-10 h-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg"
                  alt="Joe Biden" />
                <div className="flex flex-col ml-2">
                  <h1 className="text-white font-bold text-sm">
                    @PEPE
                  </h1>
                  <p className="text-gray-400 text-sm">$3,500,567</p>
                </div>
              </div>
              <div className="">
                <div className="flex items-center h-full text-white">
                  <a href="#"
                    className="text-xs font-bold text-red-400 px-4 py-1 rounded-full border-2 border-red-400">Remove</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bookmarks