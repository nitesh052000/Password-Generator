import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberAllowed] = useState(false);
  const [characterallowed, setCharaterallowed] = useState(false);

  const [Password, setPassword] = useState("");

  const handlecopy = () => {
    window.navigator.clipboard.writeText(Password);
    alert("Password copied successfully");
  };

  const generatePassword = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberallowed) {
      str += "1234567890";
    }
    if (characterallowed) {
      str += "@#$";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numberallowed, characterallowed, length]);

  useEffect(() => {
    generatePassword();
  }, [length, numberallowed, characterallowed]);

  return (
    <div className=" bg-gray-800 w-full h-screen text-orange-400">
      <h1 className=" font-bold text-3xl mb-2 text-center pt-20">Password </h1>
      <div className=" flex items-center justify-center mt-4">
        <input
          className=" rounded-lg py-3 px-2 w-80 h-[35px] font-semibold text-black"
          type="text"
          placeholder="Password"
          value={Password}
        ></input>
        <button
          onClick={handlecopy}
          className=" bg-blue-800 h-[35px] rounded-lg w-16"
        >
          COPY
        </button>
      </div>

      <div className=" flex items-center justify-center mt-4 gap-2">
        <input
          className=" cursor-pointer"
          type="range"
          value={length}
          min={6}
          max={100}
          onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor="length" onChange={(prev) => !prev}>
          Length:{length}
        </label>

        <input
          type="checkbox"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          defaultChecked={numberallowed}
        />
        <label>Numbers</label>
        <input
          type="checkbox"
          onChange={() => {
            setCharaterallowed((prev) => !prev);
          }}
          defaultChecked={characterallowed}
        />
        <label>Characters</label>
      </div>
    </div>
  );
}

export default App;
