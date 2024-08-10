import { useState, useEffect, useRef } from "react"

import Header from "../components/Header";

import { getAuth, onAuthStateChanged } from "firebase/auth"

const baseUrl = import.meta.env.VITE_API_URL

function Home() {
  const [user, setUser] = useState(null)
  const [post, setPost] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)

    const response = await fetch(`${baseUrl}/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    setPost(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <>
      <div className="w-full md:w-600">

        <Header title={"Welcome Prompt"} />

        <div
          className={`h-[93vh] w-full font-mono leading-6 prose max-w-none text-gray-400 prose-a:text-yellow-600 prose-strong:text-yellow-700 overflow-y-auto p-4 text-sm border-b border-dim-200 transition duration-350 ease-in-out border-l border-r`}
        >
          GreenAmber Operating System [Version 0.1.0]
          <br />(c) {new Date().getFullYear()} Green Amber Community.<br className="visible md:hidden" /> All rights reserved.

          <br /><br />Initiate by Wawan Setyawan.
          <br />Click <a href="https://linkedin.com/in/wawanbsetyawan" target="_blank" className="text-amber-400">'here'</a> to get help.

          <br /><br /><span className="text-green-600">
            C:\User\{user ? user.displayName : 'Guest'}&gt;</span>
          <span className="text-yellow-600">greeting</span> <span className="text-yellow-300 italic">welcome</span>
          {isLoading && <span className="text-white blink">_</span>}

          <br />{post && <p className="mt-2" dangerouslySetInnerHTML={{ __html: post.body }} />}

        </div>

      </div>
    </>
  )
}
export default Home