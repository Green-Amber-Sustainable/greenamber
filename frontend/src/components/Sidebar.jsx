import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";

import { toast } from "react-hot-toast";
import Toast from "./Toast"

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signInWithGooglePopup } from "../utils/firebase"

import { IoInformationCircleOutline, IoBookmarkOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TbPrompt, TbBulb } from "react-icons/tb";

function Sidebar({ session, setSession }) {
  const location = useLocation();
  const [profile, setProfile] = useState(null)
  const [user, setUser] = useState(null)

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    // console.log(response);
    const user = response.user;
    setUser(user.providerData[0]);
    localStorage.setItem('user', JSON.stringify(user.providerData[0]))
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <>
      <div className="hidden md:block w-68 xs:w-88 xl:w-275 h-screen">
        <div className="flex flex-col justify-between h-screen xl:pr-3 fixed overflow-y-auto w-68 xs:w-88 xl:w-275">

          <div>
            <Link className="flex my-1 pl-2 justify-center xl:justify-start border-b border-dim-200" to="/">
              <h1 className="hidden md:block font-semibold py-2 text-xl text-green-500">Green <span className="font-bold text-amber-400">Amber</span>
                <small className="ml-2 font-normal text-end text-blue-400 italic">:community</small></h1>
            </Link>

            <nav className="mt-5">
              <Link to="/"
                className={`flex items-center justify-center xl:justify-start ${location.pathname === '/' ? 'text-amber-400' : 'text-white hover:text-amber-400'} transition duration-350 ease-in-out p-2 mb-2 hover:bg-slate-800 rounded-xl`}>
                <TbPrompt className="h-6 w-6 text-white" />
                <span className="hidden xl:block ml-4 font-bold text-md">Home</span>
              </Link>

              <Link to="/about"
                className={`flex items-center justify-center xl:justify-start ${location.pathname === '/about' ? 'text-amber-400' : 'text-white hover:text-amber-400'} transition duration-350 ease-in-out p-2 mb-2 hover:bg-slate-800 rounded-xl`}>
                <IoInformationCircleOutline className="h-6 w-6 text-white" />
                <span className="hidden xl:block ml-4 font-bold text-md">About Us</span>
              </Link>

              <Link to="/explore"
                className={`flex items-center justify-center xl:justify-start ${location.pathname === '/explore' ? 'text-amber-400' : 'text-white hover:text-amber-400'} transition duration-350 ease-in-out p-2 mb-2 hover:bg-slate-800 rounded-xl`}>
                <TbBulb className="h-6 w-6 text-white" />
                <span className="hidden xl:block ml-4 font-bold text-md">Projects</span>
              </Link>
            </nav>
          </div>

          <div>
            <nav className="mt-5">
              {user && <Link to="/project"
                className="mx-auto w-11 h-11 xl:w-auto flex items-center justify-center bg-gradient-to-r from-green-500 via-amber-500 to-amber-400 py-3 rounded-2xl text-white font-bold font-sm transition duration-350 ease-in-out mb-10">
                <svg fill="currentColor" viewBox="0 0 24 24" className="block xl:hidden h-6 w-6">
                  <path
                    d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z">
                  </path>
                </svg>
                <span className="hidden xl:block font-bold text-md">Submit Project</span>
              </Link>}

              {user && <Link to="/bookmarks"
                className={`flex items-center justify-center xl:justify-start ${location.pathname === '/bookmarks' ? 'text-amber-400' : 'text-white hover:text-amber-400'} transition duration-350 ease-in-out p-2 mb-2 hover:bg-slate-800 rounded-xl`}>
                <IoBookmarkOutline className="h-6 w-6 text-white" />
                <span className="hidden xl:block ml-4 font-bold text-md">Bookmarks</span>
              </Link>}

              {user && <Link to="/talk-to-doc"
                className={`flex items-center justify-center xl:justify-start ${location.pathname === '/talk-to-doc' ? 'text-amber-400' : 'text-white hover:text-amber-400'} transition duration-350 ease-in-out p-2 mb-2 hover:bg-slate-800 rounded-xl`}>
                <IoChatbubbleEllipsesOutline className="h-6 w-6 text-white" />
                {/* <span class="relative flex h-3 w-3 mt-0">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span> */}
                <span className="hidden xl:block ml-4 font-bold text-md">Talk to Doc</span>
              </Link>}

              {user && <Link to="/account" className={`flex items-center justify-center xl:justify-start mb-8 transition duration-350 ease-in-out p-2 hover:bg-slate-800 rounded-xl`}>
                <img className="w-6 h-6 rounded-full"
                  src={user.photoURL} alt="pict" />
                <div className="hidden xl:block flex flex-col ml-4">
                  <h1 className="flex flex-row text-white font-bold text-sm">
                    {user.displayName}
                  </h1>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </Link>}

              {!user && <div className={`flex items-center justify-center xl:justify-start mb-8 cursor-pointer transition duration-350 ease-in-out p-2 hover:bg-slate-800 rounded-xl`} onClick={logGoogleUser}>
                <img className="w-6 h-6 rounded-full"
                  src="./doc.png" alt="google" />
                <div className="hidden xl:block flex flex-col ml-4">
                  <h1 className="text-white font-bold text-sm">
                    Login with Google
                  </h1>
                  <p className="text-gray-400 text-sm">someone@gmail.com</p>
                </div>
              </div>}
            </nav>

          </div>

        </div>

        <Toast />
      </div>
    </>
  )
}
export default Sidebar