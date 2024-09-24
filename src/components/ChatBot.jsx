import React, { useState, useEffect } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  // Speech Recognition initialization
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true; 
    recognition.interimResults = true;
    recognition.lang = "en-US";
  } else {
    console.error("SpeechRecognition API not supported in this browser.");
    setError(
      "SpeechRecognition API is not supported in your browser. Please use Chrome."
    );
  }

  const startListening = () => {
    if (recognition && !listening) {
      recognition.start();
      setListening(true);
      console.log("Listening started...");
    }
  };

  const stopListening = () => {
    if (recognition && listening) {
      recognition.stop();
      setListening(false);
      console.log("Listening stopped.");
    }
  };

  useEffect(() => {
    if (recognition) {
      recognition.onstart = () => {
        console.log("Speech recognition service has started");
      };

      recognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript); 
        console.log("Transcribed: ", finalTranscript);
      };

      recognition.onerror = (event) => {
        console.error("SpeechRecognition Error: ", event.error);
        setError(`Error occurred: ${event.error}`);

        if (event.error !== "aborted" && listening) {
          setTimeout(() => {
            startListening();
            console.log("Restarting speech recognition due to error...");
          }, 1000); 
        }
      };

      recognition.onend = () => {
        console.log("Speech recognition service disconnected.");
        if (listening) {
          setTimeout(() => {
            startListening(); 
            console.log("Restarting speech recognition...");
          }, 1000); 
        }
      };

      return () => {
        recognition.stop();
        console.log("Recognition stopped on component unmount.");
      };
    }
  }, [recognition, listening]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setTranscript(e.target.value);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleChat}
        className="bg-blue-600 p-3 rounded-full shadow-lg border-2 border-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a9.373 9.373 0 01-4-.839L2 17l1.084-2.168A7.96 7.96 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM6 9a1 1 0 10-2 0 1 1 0 002 0zm3-1a1 1 0 100 2 1 1 0 000-2zm5 1a1 1 0 11-2 0 1 1 0 012 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg w-80 h-96 p-4 mt-2 relative border border-gray-300 transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <div className="flex items-center">
              <img
                src="https://img.freepik.com/premium-vector/homemade-kitchen-logo-with-cute-mom-character_450825-207.jpg?" 
                alt="ChatBot Avatar"
                className="rounded-full mr-2 w-10 h-10"
              />
              <h2 className="text-xl font-bold text-gray-800">ChatBot</h2>
            </div>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700 transition duration-300"
            >
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 p-2 border rounded border-gray-200 bg-gray-50">
            <p className="text-gray-700">Hi! How can I help you today?</p>
            {/* Add your chatbot logic here */}
          </div>

          <div>
            <textarea
              value={transcript}
              onChange={handleInputChange}
              placeholder="Type or speak a message..."
              className="w-full p-2 border rounded border-gray-300 h-20 resize-none overflow-y-auto shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows={4}
            />
            <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded w-full border border-blue-700 hover:bg-blue-700 transition duration-300">
              Send
            </button>
            <div className="mt-2 flex justify-around">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-green-600"
                onClick={listening ? stopListening : startListening}
              >
                {listening ? "Stop Listening" : "Start Listening"}
              </button>
            </div>
          </div>

          {listening && <p className="mt-2 text-center text-green-500">Listening...</p>}
          {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
