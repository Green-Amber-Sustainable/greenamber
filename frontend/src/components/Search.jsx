import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

function Search() {
  const projectsRef = collection(db, "projects");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const getUsers = async () => {
    const q = query(collection(db, "users"), where("inventor", "==", true));

    const data = await getDocs(q);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getProjects = async () => {
    const data = await getDocs(projectsRef);
    setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers()
    getProjects()
  }, []);

  return (
    <>
      <div className="hidden md:block lg:w-350 h-screen">
        <div className="flex flex-col fixed justify-between w-290 lg:w-350 h-screen">

          <div>

            <div className="relative m-2">
              <div className="absolute text-gray-600 flex items-center pl-4 h-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="18" height="18"
                  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"
                  strokeLinejoin="round">
                  <path
                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                  </path>
                </svg>
              </div>
              <input
                className="w-full bg-dim-400 border-dim-400 text-gray-100 focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 font-normal h-9 flex items-center pl-12 text-sm rounded-lg border shadow"
                placeholder="Search Project.." />
            </div>

            <div className="bg-dim-700 rounded-lg m-2">
              <h1
                className="text-white text-md font-bold p-3 border-b border-dim-200">
                Last Active Inventor
              </h1>

              {users && users.sort((a, b) => b.lastLogin - a.lastLogin).slice(0, 3).map((row, id) => (
                <div key={id}
                  className="text-amber-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                  <div className="flex flex-row justify-between p-2">
                    <div className="flex flex-row">
                      <img className="w-10 h-10 rounded-full"
                        src={row.photoURL}
                        alt="" />
                      <div className="flex flex-col ml-2">
                        <h1 className="text-white font-bold text-sm">
                          {row.displayName}
                        </h1>
                        <p className="text-gray-400 text-sm">{row.email}</p>
                      </div>
                    </div>
                  </div>
                </div>)
              )}

              <div
                className="text-amber-400 text-sm font-normal p-3 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                Show more
              </div>
            </div>

            <div className="bg-dim-700 rounded-lg m-2 overflow-y-auto">
              <h1
                className="text-white text-md font-bold p-3 border-b border-dim-200">
                Trending Projects
              </h1>

              {projects && projects.sort((a, b) => b.bookmarks - a.bookmarks).slice(0, 5).map((row, id) => (
                <div key={id}
                  className="text-amber-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-dim-300 transition duration-350 ease-in-out">
                  <a className="font-bold text-md text-white hover:text-amber-400" target="_blank" href={row.link}>
                    {row.title}
                  </a>
                  <p className="text-xs text-gray-400">29.7K Bookmarks</p>
                </div>)
              )}

              <div
                className="text-amber-400 text-sm font-normal p-3 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                Show more
              </div>
            </div>

          </div>

          <footer>
            <div className="px-4 py-1 border-gray-200 text-gray-400">
              powered by
              <img className="h-12" src="./gemini.png" alt="" />
            </div>

            <ul className="text-xs text-gray-500 mb-4 mx-2">
              <li className="inline-block mx-2">
                <Link className="hover:underline" to="/terms">Terms of Service</Link>
              </li>
              <li className="inline-block mx-2">
                <Link className="hover:underline" to="/privacy">Privacy Policy</Link>
              </li>
              <li className="inline-block mx-2">
                <a className="hover:underline" href="https://t.me/greenamber_community" target="_blank">Community</a>
              </li>
              <li className="inline-block mx-2">
                <a className="hover:underline" href="#">Career</a>
              </li>
              <br />
              <li className="inline-block my-2 mx-2">© {new Date().getFullYear()} Green Amber Community.</li>
            </ul>
          </footer>
        </div>
      </div>
    </>
  )
}
export default Search