import { useState } from 'react';
import './App.css'
import ChatWindow from './ChatWindow';
import SideBar from './SideBar';
import { MyContext } from './myContext';
import {v1 as uuidv1} from 'uuid';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setcurrThreadId] = useState(uuidv1());
  const [newChat, setnewChat] = useState(true);
  const [prevChat, setprevChat] = useState([]);   //store all chats of curr thread
  const [allThread, setAllThread] = useState([]);

  const provideValues = {prompt, setPrompt, reply, setReply, currThreadId, setcurrThreadId, 
    newChat, setnewChat, prevChat, setprevChat, allThread, setAllThread};  
  //pass all state vars so that it can be used across diff lvls of the app

  return (
    <>
    <div className='app'>
      <MyContext.Provider value = {provideValues}>
        <SideBar/>
        <ChatWindow/>
      </MyContext.Provider>
      </div>
    </>
  )
}

export default App
