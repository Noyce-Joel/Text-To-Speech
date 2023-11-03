import { useEffect, useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const [input, setInput] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [pdfInput, setPdfInput] = useState<string>();



  useEffect(() => {
    let speech = new SpeechSynthesisUtterance();

    speechSynthesis.onvoiceschanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    const handleConversion = () => {
      speech.text = input;
      if (selectedVoice) {
        const voice = voices.find((v) => v.name === selectedVoice);
        if (voice) {
          speech.voice = voice;
        }
      }

      speechSynthesis.speak(speech);
    };

    const button = document.querySelector("button");
    if (button) button.addEventListener("click", handleConversion);

    return () => {
      if (button) button.removeEventListener("click", handleConversion);
    };
  }, [input, selectedVoice, voices]);

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoice(e.target.value);
  };

  return (
    <div className="wrap">
      <div className="input">
        <h1>Convert Text To Speech</h1>
        <label>Enter text here:</label>
        <input onChange={(e) => setInput(e.target.value)} type="textarea" />
        {/* <form action="/profile" method="post" encType="multipart/form-data">
          <input type="file" name="input" />
          <button type='submit'>Upload</button>
        </form> */}
        <input type="file" name="input" />
          <button type='submit'>Upload</button>
       
      </div>
      <div>
        <button>Convert</button>
        <select onChange={handleVoiceChange} value={selectedVoice}>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
