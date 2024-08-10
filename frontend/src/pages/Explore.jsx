import { useState, useEffect } from "react";
import Header from "../components/Header"
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../utils/firebase";

import { MdOutlineReport } from "react-icons/md";

import formatDate from "../utils/formatDate";

function Explore() {
  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    const data = await getDocs(collection(db, "projects"));
    data.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    });
    setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const getImg = (image) => {
    return window.URL.createObjectURL(image)
  }

  useEffect(() => {
    getProjects()
  }, []);

  return (
    <>
      <div className="md:w-600">

        <Header title="Explore" />

        <div className="h-[92vh] overflow-y-auto border-b border-dim-200 transition duration-350 ease-in-out pb-4 border-l border-r">

          {projects && projects.sort((a, b) => b.submitAt - a.submitAt).map((row, id) => (
            <div
              key={id}
              className="transition duration-350 ease-in-out pb-4">
              <div className="flex flex-shrink-0 p-4 pb-0 pt-2 border-t border-dim-200">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-top w-full">
                    <div>
                      <img className="inline-block h-9 w-9 rounded-full"
                        src={row.inventor.photo} alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="flex items-center text-base leading-6 font-medium text-white">
                        <span
                          className="ml-1 text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                          @{row.inventor.email.split('@')[0]} &#183; {formatDate(row.submitAt, 'YYYY-MM-DD HH:mm')}
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="pl-16 pr-2">
                <p className="flex flex-col gap-2 mb-3 text-base width-auto font-medium text-white flex-shrink">
                  <a href={row.link} target="_blank" className="font-bold text-amber-500">{row.title}</a>
                  <small>({row.category})</small>
                  {row.description}
                </p>
              </div>
              <br />
              <div className="flex flex-row justify-between pl-16 pr-4">
                <p className="text-gray-400"></p>
                <a href={row.link} target="_blank" className="text-xs font-bold text-amber-400 px-4 py-1 rounded-full border-2 border-amber-400">visit web</a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Explore