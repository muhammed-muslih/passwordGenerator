import {useState,useCallback,useEffect,useRef} from 'react'

function App() {
  const [length,setLength] = useState(8)
  const [isNumberAllowed,setNumberAllowed] = useState(false)
  const [isCharacterAllowed,setCharacterAllowed] = useState(false)
  const [password,setPassword] = useState('')
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let number ="0123456789"
    let char = '!@#$%^&*()'
    let pswd=""
    if (isNumberAllowed) str += number
    if(isCharacterAllowed) str += char
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
       pswd+=str[char]
    }
    setPassword(pswd)
  },[length,isNumberAllowed,isCharacterAllowed])

  useEffect(() => {
  generatePassword()
  },[length,isNumberAllowed,isCharacterAllowed,generatePassword])

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    

  }
  return (
    <div className="w-full h-screen bg-cyan-950 py-2">
      <div className="bg-cyan-900  max-w-xl mx-auto shadow-md py-3
       px-4 rounded-lg text-yellow-600 text-xl font-bol my-8 overflow-hidden">
        <h1 className="text-center font-bold text-white">Password Generator</h1>
        <div className="rounded-lg overflow-hidden flex shadow my-4">
          <input 
          type="text"
          readOnly 
          placeholder="Password"
          value={password}
          ref={passwordRef}
          className="outline-none py-2 px-3 w-full " />
          <button 
          onClick={copyToClipboard}
          className="outline-none bg-blue-900 text-white px-3 py-1 hover:bg-blue-800">copy</button>
        </div>
        <div className="flex text-base font-bold gap-x-5">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer accent-blue-900"
            name=""
            id=""
             />
             <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={isNumberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            name=""
            id=""
            className='accent-blue-900 w-4 h-4 rounded-full bg-white border-cyan-900'
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input 
            type="checkbox" 
            defaultChecked={isCharacterAllowed}
            onChange={() => setCharacterAllowed((prev) => !prev)}
            name=""
            id=""
            className='accent-blue-900 w-4 h-4 rounded-full bg-white border-cyan-900'
            />
            <label htmlFor="character">Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
