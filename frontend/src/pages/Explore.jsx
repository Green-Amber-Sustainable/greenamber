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
      <div className="w-full md:w-600">

        <Header title="Explore" />

        <div
          className="h-[92vh] overflow-y-auto border-b border-dim-200 transition duration-350 ease-in-out pb-4 border-l border-r">

          {projects && projects.sort((a, b) => b.submitAt - a.submitAt).map((row, id) => (
            <div
              key={id}
              className=" transition duration-350 ease-in-out pb-4">
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
                    <div className="ml-3 text-end">
                      <MdOutlineReport className="text-xl text-red-400" />
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
                <a href={row.link} target="_blank" className="text-amber-600">{row.link.split('https://')[1]}</a>
                <p className="text-gray-400"></p>
                <button className="text-xs font-bold text-amber-400 px-4 py-1 rounded-full border-2 border-amber-400">bookmark</button>
              </div>
            </div>
          ))}


          {/* <div
            className="border-b border-dim-200 cursor-pointer transition duration-350 ease-in-out pb-4 border-l border-r">
            <div className="flex flex-shrink-0 p-4 pb-0">
              <a href="#" className="flex-shrink-0 group block">
                <div className="flex items-top">
                  <div>
                    <img className="inline-block h-9 w-9 rounded-full"
                      src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg" alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="flex items-center text-base leading-6 font-medium text-white">
                      Joe Biden
                      <svg viewBox="0 0 24 24" aria-label="Verified account" fill="currentColor"
                        className="w-4 h-4 ml-1 text-white">
                        <g>
                          <path
                            d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z">
                          </path>
                        </g>
                      </svg>
                      <span
                        className="ml-1 text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        @JoeBiden &#183; Nov 7
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="pl-16">
              <p className="mb-3 text-base width-auto font-medium text-white flex-shrink">
                A conspiracy theory that suggests that political power is held by private individuals, rather than publicly elected representatives.
                It is also known as the shadow government, secret government, or invisible government.
                Cryptocracy is a form of government where the real leaders are hidden, or merely unknown
              </p>

              <swiper-container
                slides-per-view="2.1"
                space-between="10"
                scrollbar-clickable="true"
                mousewheel-invert="true"
                navigation="false"
                pagination-dynamic-bullets="false"
                autoplay="true"
                autoplay-delay="2000"
                autoplay-disable-on-interaction="false"
                className="flex my-3 mr-2 rounded-lg border border-gray-600 pb-8"
              >
                <swiper-slide className="z-1">
                  <img className="rounded-lg" src="https://pbs.twimg.com/media/EnTkhz-XYAEH2kY?format=jpg&name=small"
                    alt=""
                  />
                </swiper-slide>
                <swiper-slide>
                  <img className="rounded-lg" src="https://pbs.twimg.com/media/EnTkhz-XYAEH2kY?format=jpg&name=small"
                    alt=""
                  />
                </swiper-slide>
                <swiper-slide>
                  <img className="rounded-lg" src="https://pbs.twimg.com/media/EnTkhz-XYAEH2kY?format=jpg&name=small"
                    alt=""
                  />
                </swiper-slide>
                <swiper-slide>
                  <img className="rounded-lg" src="https://pbs.twimg.com/media/EnTkhz-XYAEH2kY?format=jpg&name=small"
                    alt=""
                  />
                </swiper-slide>
              </swiper-container>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Explore