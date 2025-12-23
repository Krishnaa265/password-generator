import { useState, useCallback, useEffect,useRef } from 'react'


function App() {
  const [len, setlen] = useState(8)
  const [num, setnum] = useState(false);
  const [chars ,setchars] = useState(false);
  const[pass,setpass]= useState("");
  // useref hook variable
  const passwordref = useRef();
const passgenerator = useCallback(()=>{
let pass ="";
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
if(num)str+= "0123456789";
if(chars)str+= "!@#$*&)(%";

for(let i=0;i<len;i++){
  let l = str.length;
  let RandomIndex = Math.floor(Math.random()*l);
  let ch = str[RandomIndex];
  pass+= ch;
}

setpass(pass)
},[len,num,chars,setpass])
  const copy_password_to_clipboard = useCallback(()=>{
    passwordref.current?.select();

window.navigator.clipboard.writeText(pass);                        
  },[pass])
useEffect(()=>{passgenerator()},[len,num,chars,passgenerator])
  return (
    <>
    <div className='w-screen bg-black h-14' >
 <h1 className='text-center text-4xl text-green-600 italic '>
      Password Generator
      </h1>
      <div className='w-full max-w-lg  h-32 mx-auto shadow-lg rounded-lg px-6 text-black bg-green-400 mt-10'>
<div>
   <input type='text' value={pass} 
   className='outline-none w-96 py-1.5 px-2 rounded-s-lg mt-2 '
   placeholder='password'
   readOnly
   ref = {passwordref}
   ></input>
   <button
   onClick={copy_password_to_clipboard}
   className='outline-none bg-green-950 text-white px-4 py-1.5 shrink-0 rounded-r-lg'>copy</button>
</div>
 <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1 mt-4  '>
      <input type='range' min={6} max={50} value={len}
      className='cursor-pointer size-'
      onChange={(e)=>{setlen(e.target.value)}}/>
      <label className='text-gray-700 text-base'>Length : {len}</label>

      <input type='checkbox' 
      className='ml-6 mt-0.5 size-4'
      onChange={()=>{setnum(x=>!x)}}/>
      <label className='text-gray-700 text-base'> Numbers</label>

      <input type='checkbox' 
      className='ml-6 mt-0.5 size-4'
      onChange={()=>{setchars(x=>!x)}}/>
      <label className='text-gray-700 text-base'> Characters</label>

    </div>
      </div>

      </div>
    </div>
     
    </>
  )
}

export default App
