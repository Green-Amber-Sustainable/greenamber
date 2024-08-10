import { useState, useEffect, useRef } from "react"
import Markdown from 'react-markdown'
import { getAuth, onAuthStateChanged } from "firebase/auth"

function Chat({ avatar, type, message }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <>
      <div
        className="transition duration-350 ease-in-out pb-4">

        <div className="">
          <div className="flex flex-shrink-0 p-4 pb-0">
            <div className="w-12 flex items-top">
              <img className="inline-block h-9 w-9 rounded-full"
                src={type === 'model' ? `./${avatar}` : `${user && user.photoURL}`} alt="" />
            </div>
            <div className="w-full ml-2">
              <Markdown className="mb-3 font-medium text-white prose prose-a:text-amber-500 prose-strong:text-amber-600">{message}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat;