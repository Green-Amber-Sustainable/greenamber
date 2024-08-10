import { useState, useEffect } from "react";
import Header from "../components/Header"
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

function Inventors() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const q = query(collection(db, "users"), where("inventor", "==", true));

    const data = await getDocs(q);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <>
      <div className="w-full md:w-600">

        <Header title="All Great Inventor" />

        <div
          className="min-h-[92vh] border-b border-dim-200 cursor-pointer transition duration-350 ease-in-out pb-4 border-l border-r">

          {users && users.sort((a, b) => b.projects - a.projects).map((row, id) => (
            <div key={id}
              className="text-blue-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
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
                <div className="">
                  <div className="flex items-center h-full text-white">
                    <p
                      className="text-xs font-bold text-amber-400 px-4">{row.projects || 0} Projects</p>
                  </div>
                </div>
              </div>
            </div>)
          )}

        </div>
      </div>
    </>
  )
}

export default Inventors;