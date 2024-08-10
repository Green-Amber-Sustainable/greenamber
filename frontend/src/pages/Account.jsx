import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header"

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"

function Account() {
  const [session, setSession] = useState(null)
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null)

  const logOut = async () => {
    await signOut(auth);
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [])

  return (
    <>
      <div className="w-full md:w-600">

        <Header title="Account" />

        <div
          className="min-h-[92vh] border-b border-dim-200 cursor-pointer transition duration-350 ease-in-out pb-4 border-l border-r">
          <div
            className="text-blue-400 text-sm font-normal p-3 border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
            <h2 className="font-bold text-md text-white">
              {user && user.displayName}
            </h2>
            <p className="text-xs text-gray-400">Full Name</p>
          </div>

          <div
            className="text-blue-400 text-sm font-normal p-3 border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
            <h2 className="font-bold text-md text-white">
              {user && user.email}
            </h2>
            <p className="text-xs text-gray-400">Email</p>
          </div>

          <div
            className="text-blue-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out"
            onClick={logOut}
          >
            <h2 className="font-bold text-md text-red-600">
              Sign Out
            </h2>
            <p className="text-xs text-gray-400">You can always come back anytime.</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default Account