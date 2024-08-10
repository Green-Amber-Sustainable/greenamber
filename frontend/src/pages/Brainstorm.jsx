import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Chat from "../components/Chat";

import { getAuth, onAuthStateChanged } from "firebase/auth"

import { RiChatNewLine } from "react-icons/ri";

const baseUrl = import.meta.env.VITE_API_URL

function Brainstorm() {
  const [user, setUser] = useState(null)

  const chatEndRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false);

  const inputFile = useRef(null);
  const [conversationHistory, setConversationHistory] = useState([])
  const [userInput, setUserInput] = useState("")

  const scrollToBottom = () => {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  async function sendMessage() {
    setIsLoading(true)

    inputFile.current.value = "";

    setConversationHistory((previousMessages) => [
      ...previousMessages,
      { type: "user", message: userInput },
    ])

    setShowResults(true);
    scrollToBottom()

    const response = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_message: userInput,
        conversation_history: conversationHistory
      })
    });

    const data = await response.json();

    setConversationHistory((previousMessages) => [
      ...previousMessages,
      { type: "model", message: data },
    ])

    scrollToBottom()

    setUserInput(null)
    setIsLoading(false)
  }

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

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

        <Header title={isLoading ? "Doc is thinking..." : user ? "Start Your Project. Talk to Doc!" : "Login to chat."} />

        <div
          className={`${user ? 'h-[85vh]' : 'h-[92vh]'} overflow-y-auto border-b border-dim-200 transition duration-350 ease-in-out border-l border-r`}
        >
          <div className="fixed opacity-65"></div>

          <div className="flex flex-shrink-0 p-4 pb-4">
            <div className="w-12 flex items-top">
              <img className="inline-block h-9 w-9 rounded-full"
                src='./docbrown.png' alt="" />
            </div>
            <div className="w-full ml-2">
              <p className="mb-3 text-wrap width-auto font-medium text-white flex-shrink-0">
                I'm here to inspire, educate, and support you in developing innovative solutions to any problems related to climate change.
              </p>
            </div>
          </div>

          {
            showResults && conversationHistory.map(({ type, message }, index) => (
              <Chat avatar="docbrown.png" key={index} type={type} message={message} isLoading={isLoading} />
            ))
          }

          {isLoading && <div className="flex flex-shrink-0 p-4 pb-4">
            <div className="w-12 flex items-top">
              <img className="inline-block h-9 w-9 rounded-full animate-spin spin-slow"
                src='./gemini-ai.png' alt="" />
            </div>
            <div className="w-full ml-2">
              <p className="blink mb-3 text-wrap width-auto font-medium text-white flex-shrink-0">is typing...</p>
            </div>
          </div>}

          <div ref={chatEndRef}></div>

        </div>

        {user && <div className="border-b border-dim-200 pb-4 border-l border-r">
          <div className="flex flex-shrink-0 p-4 pb-0">
            <div className="w-12 hidden md:flex items-top">
              <img className="inline-block h-10 w-10 rounded-full"
                src={user.photoURL} alt="" />
            </div>
            <div className="w-full md:ml-2">
              <input
                className="text-white text-gray-900 placeholder-gray-400 w-full p-2 bg-slate-600 rounded-md border-0 focus:outline-none resize-none"
                placeholder="Ready to innovate?"
                defaultValue={userInput}
                ref={inputFile}
                onKeyUp={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="ml-2 align-middle">
              <RiChatNewLine className="mt-2 h-6 w-6 cursor-pointer text-blue-500 align-middle" onClick={() => setConversationHistory([])} />
            </div>
          </div>
        </div>}

      </div>
    </>
  )
}
export default Brainstorm;
