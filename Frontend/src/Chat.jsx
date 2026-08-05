import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from './myContext';
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Chat() {
    const { newChat, prevChat, reply } = useContext(MyContext);
    const [latestReply, setlatestReply] = useState(null);

    useEffect(() => {
        if(reply === null){
            setlatestReply(null); 
            return;
        }
        if(!prevChat?.length) return;

        const content = reply.split(" ");
        let index = 0;
        const interval = setInterval(() => {
            setlatestReply(content.slice(0, index+1).join(" "));
            index++;
            if(index>=content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevChat, reply])

    return (
        <>
            {newChat && <h1>NEW CHAT</h1>}

            <div className="chats">
            {
                prevChat?.slice(0,-1).map((chat, idx) =>
                    <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                        {
                            // show chat
                            chat.role === "user" ?
                            <p className="userMessage">{chat.content}</p> :
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>                                
                        }
                    </div>
                )
            }
                {/* typing effect on latest reply */}
                {
                    prevChat.length > 0 && latestReply !=null &&
                    <div className="gptDiv" key={"typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>                      
                    </div>
                }

                {/* no effect when showing whole prev chat */}
                {
                    prevChat.length > 0 && latestReply ===null &&
                    <div className="gptDiv" key={"non-typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}> 
                            {prevChat[prevChat.length-1].content}
                        </ReactMarkdown>                      
                    </div>
                }

            </div>
        </>
    )
}