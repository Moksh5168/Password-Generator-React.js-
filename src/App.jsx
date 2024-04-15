import { useState , useCallback , useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false); // Track if text is copied //Additionl


  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

  for (let i = 1; i <=length; i++) {
    let char =Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    
  }

  setPassword(pass)

  },[length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100) // it is use  to select the particuar range of paassword to OPTIMIZE CODE 
    window.navigator.clipboard.writeText(password)
    setCopied(true); // Set copied state to true
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,setPassword])

// useEffect to show alert when text is copied
useEffect(() => {
  if (copied) {
    alert('Password copied to clipboard!');
    setCopied(false); // Reset copied state
  }
}, [copied]);

  return (
    <>
      
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-10 ">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
         <input type="text" value={password} className="outline-none w-full py-1 px-3 " placeholder="password" readonly ref={passwordRef}/>
         <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" style={{ backgroundColor: copied ? 'green' : 'blue' }} >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min ={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id="numberAllowed" onChange={()=>{setNumberAllowed((prev) => !prev)}}/>
            {/* <label>Number:{numberAllowed}</label> */}
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} id="charAllowed" onChange={()=>{setCharAllowed((prev) => !prev)}}/>
            <label htmlFor="CharacterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
