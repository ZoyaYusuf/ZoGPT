import { MyContext } from "./myContext";
import "./SideBar.css";
import { useContext, useEffect } from "react";
import {v1 as uuidv1} from 'uuid';



export default function SideBar(){
    const { allThread, setAllThread, currThreadId, setnewChat, setPrompt, setReply, setcurrThreadId ,setprevChat} = useContext(MyContext);

    //display all chat
    const getAllThread = async() => {
        try{
            const response = await fetch("http://localhost:8181/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({
                threadId : thread.threadId, title: thread.title
            })
            ); 
            setAllThread(filteredData);
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getAllThread();
    },[currThreadId])

    //new chat
    const createNewChat = () =>{
        setnewChat(true);
        setPrompt("");
        setReply(null);
        setcurrThreadId(uuidv1());
        setprevChat([]);
    }

    //display chat of clicked thread
    const changeThread = async (newthreadId) =>{
        setcurrThreadId(newthreadId);
        try{
            const response = await fetch(`http://localhost:8181/api/thread/${newthreadId}`);
            const res = await response.json();
            setprevChat(res);
            setnewChat(false);
            setReply(null);
        }catch(err){
            console.log(err);
        }
    }

    //del a thread
    const deleteThread = async (delThreadId) =>{
        try{
            const response = await fetch(`http://localhost:8181/api/thread/${delThreadId}`, {method : 'DELETE'});
            const res = await response.json();

            //redendering when thread deleted
            setAllThread( prev =>  prev.filter(thread => thread.threadId !== delThreadId));

            if (delThreadId === currThreadId) {
                createNewChat();
            }

        }catch(err){
            console.log(err);

        }
    }

    return(
        <>
        <section className="sidebar">
            <button onClick={createNewChat}>
                <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
                {/* new chat */}
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            <ul className="history"> 
                {/* main logic behind displaying history with titles */}
                {
                    allThread?.map((thread, idx) => (
                        <li key={idx} onClick={()=> changeThread(thread.threadId)} className={thread.threadId === currThreadId ? "highlighted": " "}>
                            {thread.title}
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation(); //stop event bubbling
                                    deleteThread(thread.threadId);
                                }}>
                            </i>
                        </li>
                        
                    ))
                }
            </ul>

            <div className="sign">
                <p>By ZoZA &hearts;</p>
            </div>
        </section>
        </>
    )
}