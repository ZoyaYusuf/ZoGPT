import "./ChatWindow.css";
import Chat from "./Chat";
import { MyContext } from './myContext';
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";


export default function ChatWindow(){
    const {prompt, setPrompt, reply, setReply, currThreadId, newChat, setnewChat, prevChat, setprevChat} = useContext(MyContext); 
    //in chat window we will need all the state var for proccessing req and displaying
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    //get Response from openAI
    const getReply = async() =>{
        setLoading(true);
        const options = {           
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body:JSON.stringify({     // req ki body me yeh dono pass karenge
                messages: prompt,
                threadId :currThreadId
            })
        };
        try{
            const response = await fetch("http://localhost:8181/api/chat", options); //connect with backend
            const res = await response.json();
            setReply(res.reply)
            console.log(res.reply)
        }
        catch(err){
            console.log(err)
        }
        setLoading(false);
    }

    //Append new chat with prev chat...meaning : when the chat begins save the prompt+reply combo into prev cause its not new anymore
    useEffect(() => {
        if(prompt && reply) {
            setprevChat(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }
        setPrompt("");
    }, [reply]);

    //show drop down when profile icon is clicekd
    const showDropDown = () => {
        setIsOpen(!isOpen)
        // toggle
    }
    return(
        <>
        <div className="chatWindow">
            <div className="navbar">
                <span>ZoZaGPT <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={showDropDown}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }

             <Chat></Chat>
             
            <ScaleLoader color="#fff" loading={loading}>
            </ScaleLoader>

             <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything" value={prompt} 
                        onChange={(e)=> setPrompt(e.target.value)} 
                        onKeyDown={(e)=> e.key==='Enter' ? getReply() : ''}>
                    </input>
                    {/* send btn :- */}
                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div> 
                </div>
                <p className="info">
                    ZoZaGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>

        </>
    )
}