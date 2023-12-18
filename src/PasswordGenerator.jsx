import { useState, useCallback, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PasswordGenerator = () => {
   const [length, setLength] = useState(8);
   const [useNumbers, setUseNumbers] = useState(false);
   const [useSymbols, setUseSymbols] = useState(false);
   const [password, setPassword] = useState("");

   const passwordRef = useRef(null);

   const generatePassword = useCallback(() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const num = "0123456789";
      const symbol = "!@#$%^&*";

      if (useNumbers) str += num;
      if (useSymbols) str += symbol;

      for (let i = 1; i <= length; i++) {
         let char = Math.floor(Math.random() * str.length + 1);
         pass += str.charAt(char);
      }
      setPassword(pass);
   }, [length, useNumbers, useSymbols, setPassword]);

   const copyPasswordToClipboard = () => {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
      toast("Password copied to clipboard", {
         position: "top-center",
         autoClose: 1000,
         type: "success",
      });
   };

   useEffect(() => {
      generatePassword();
   }, [length, useNumbers, useSymbols, setPassword]);
   return (
      <div className="w-full h-screen bg-black">
         <h1 className="text-center text-white text-3xl pt-5">
            Password Generator
         </h1>
         <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-10 py-10 my-8 bg-gray-700">
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
               <input
                  type="text"
                  value={password}
                  className="outline-none w-full py-1 px-3"
                  placeholder="Password"
                  readOnly
                  ref={passwordRef}
               />
               <button
                  onClick={copyPasswordToClipboard}
                  className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
               >
                  copy
               </button>
               <ToastContainer />
            </div>
            <div className="flex text-sm gap-x-2">
               <div className="flex items-center gap-x-1">
                  <input
                     type="range"
                     min={8}
                     max={32}
                     value={length}
                     className="cursor-pointer"
                     onChange={(e) => {
                        setLength(e.target.value);
                     }}
                  />
                  <label className="text-white">Length:{length}</label>
                  <div className="flex items-center gap-x-1">
                     <input
                        type="checkbox"
                        id="useNumbers"
                        defaultChecked={useNumbers}
                        onChange={() => setUseNumbers((prev) => !prev)}
                     />
                     <label className="text-white">Numbers</label>
                  </div>
                  <div className="flex items-center gap-x-1">
                     <input
                        type="checkbox"
                        id="useSymbols"
                        defaultChecked={useSymbols}
                        onChange={() => setUseSymbols((prev) => !prev)}
                     />
                     <label className="text-white">Symbols</label>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PasswordGenerator;
