import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"
import Search from "./Search"

function Layout() {
  const [session, setSession] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {

  }, [])

  return (
    <>
      <div className="md:container mx-auto">
        {/* <div className="xl:hidden flex flex-col justify-between mx-auto h-screen items-center p-4">
          <div className="text-center mt-[25%] p-4 bg-slate-600 rounded-lg">
            <h1 className="text-xl mb-3">Browser window too narrow</h1>
            <p>Our platform is currently optimized for a full screen desktop experience. Expand you screen or switch to a computer to get started.</p>
          </div>
        </div> */}
        <div className="flex flex-row justify-center z-50">
          <Sidebar session={session} setSession={setSession} isOpen={isOpen} />

          <Outlet context={[isOpen, setIsOpen]} />

          <Search />
        </div>
      </div>
    </>
  )
}
export default Layout