import { useState, useEffect, useRef } from "react";
import Header from "../components/Header"
import Markdown from 'react-markdown'

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query, where,
  doc,
} from "firebase/firestore";

const baseUrl = import.meta.env.VITE_API_URL

function Project() {
  const auth = getAuth();
  const [user, setUser] = useState(null)
  const usersRef = collection(db, "users");

  const [file, setFile] = useState();
  const fileUploadRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const [description, setDescription] = useState();
  const [form, setForm] = useState({
    title: "",
    description: "",
    version: "",
    link: ""
  });

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    uploadImageDisplay()
  }

  const uploadImageDisplay = async () => {
    setDescription({ verdict: "Let me analyze.." })
    setForm({
      title: "",
      description: "",
      version: "",
      link: ""
    })

    const formData = new FormData();
    const file = fileUploadRef.current.files[0];
    formData.append('file', file)

    const response = await fetch(`${baseUrl}/read-photo`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setDescription(data)
  }

  const generateForm = async () => {
    setIsLoading(true)
    setForm({
      title: "",
      description: "",
      version: "",
      link: ""
    })

    const formData = new FormData();
    const file = fileUploadRef.current.files[0];
    formData.append('file', file)

    const response = await fetch(`${baseUrl}/generate-form`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setForm(data)
    setIsLoading(false)
  }

  const updateForm = (field, value) => {
    switch (field) {
      case 'category':
        form.category = value
        break;
      case 'title':
        form.title = value
        break;
      case 'description':
        form.description = value
        break;
      case 'link':
        form.link = value
        break;
      default:
      // do nothing
    }
  }

  const newProject = async () => {
    setIsSubmit(true)

    form.inventor = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    }
    form.submitAt = new Date().getTime()

    const docRef = await addDoc(collection(db, "projects"), form);

    if (docRef) {
      updateInventor()
      setForm({
        title: "",
        description: "",
        version: "",
        link: ""
      })
      setDescription(null)
      setFile(null)

      setIsSubmit(false)
    } else {
      setIsSubmit(false)
    }

  }

  const updateInventor = async () => {
    let data, id
    const q = query(usersRef, where("inventor", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id;
      data = doc.data();
    });

    if (!data) {
      await updateDoc(doc(db, "users", user.uid), {
        inventor: true
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <>
      <div className="w-full md:w-600">

        <Header title="Show your project to the world" />

        <div
          className="h-[92vh] overflow-y-auto border-b border-dim-200 transition duration-350 ease-in-out pb-4 border-l border-r">

          <div className="mx-auto text-center p-4 border-b border-dim-200">
            <img className="mx-auto object-cover h-48 rounded-lg cursor-pointer" src={file ? file : './images.png'} onClick={handleImageUpload} />
            <input type="file" className="hidden" ref={fileUploadRef} onChange={handleChange} accept="image/jpg, image/jpeg, image/png" />
            <small className="text-gray-400">upload your project's photo.</small>
          </div>

          <div className="flex flex-col min-h-[65vh] p-4">

            <div className="md:px-6 lg:px-8">
              {description && <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">
                  <span className={description.verdict === "Let me analyze.." ? 'blink' : null}>
                    {description.verdict === "Let me analyze.." ? description.verdict : "What's your project is all about."}
                  </span>
                </h2>

                {description.verdict !== "Let me analyze.." && <Markdown className="prose prose-a:text-yellow-800 mt-2 text-md leading-6 text-gray-600">
                  {description.verdict}
                </Markdown>}
              </div>}

              {description && description.verdict !== "Let me analyze.." && <div className="flex flex-col md:flex-row justify-between px-12 my-8">
                {!isLoading && <button className="p-2 mx-2 my-2 border rounded-lg bg-white text-black cursor-pointer" onClick={handleImageUpload}>Browse another image..</button>}

                {!isLoading && <button
                  className="p-2 mx-2 my-2 border rounded-lg bg-amber-700 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
                  disabled={description.approved === false}
                  onClick={generateForm}
                >{description.approved === false ? 'Not a proper image!' : 'Agree to continue?'}</button>}

                {isLoading && <span className="blink mx-auto text-center mt-2">Generating form..</span>}

              </div>}

              {description && description.approved === true && form && form.title !== "" && <form action="#" method="POST" className="mx-auto max-w-xl">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-yellow-500">
                      Category <span className="text-gray-500 text-md ml-2"></span>
                    </label>
                    <div className="mt-2.5">
                      <select
                        className="block w-full rounded-md border-dim-200 px-3.5 py-2 text-gray-300 bg-slate-700 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        defaultValue={form && form.category}
                        onChange={(e) => updateForm('category', e.target.value)}
                      >
                        <option>reducing waste</option>
                        <option>create new renewable energy</option>
                        <option>inspire others to be more eco-friendly</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-yellow-500">
                      Project Name <span className="text-gray-500 text-md ml-2"> --you're welcome to edit.</span>
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-dim-200 px-3.5 py-2 text-gray-300 bg-slate-700 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        defaultValue={form && form.title}
                        onKeyUp={(e) => updateForm('title', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-yellow-500">
                      Description <span className="text-gray-500 text-md ml-2"> --you're welcome to edit.</span>
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        name="message"
                        id="message"
                        rows="6"
                        className="block w-full rounded-md border-dim-200 px-3.5 py-2 text-gray-300 bg-slate-700 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        defaultValue={form && form.description}
                        onKeyUp={(e) => updateForm('description', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-yellow-500">
                      Link to Project <span className="text-gray-500 text-md ml-2"> --you're welcome to edit.</span>
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="link"
                        id="link"
                        className="block w-full rounded-md border-dim-200 px-3.5 py-2 text-gray-300 bg-slate-700 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        defaultValue={form && form.link}
                        onKeyUp={(e) => updateForm('link', e.target.value)}
                      />
                    </div>
                  </div>

                </div>
                <div className="mt-8">
                  <button
                    disabled={!form || isSubmit}
                    type="button"
                    className={`${isSubmit && 'animate-pulse'} cursor-pointer block w-full rounded-md bg-green-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    onClick={newProject}
                  >Show to the World</button>
                </div>
              </form>}

            </div>

          </div>


        </div>
      </div>
    </>
  )
}

export default Project