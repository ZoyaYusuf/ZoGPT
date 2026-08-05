import { Router } from "express";
const Thread = require("../models/Thread.js").default.default;
import getOpenAIAPI_Response from "../utils/openai.js"; 
// import { Threads } from "openai/resources/beta/threads/threads.js";
const router = Router(); 

//test route
// router.post("/test", async (req, res) => {
//     try{
//         const thread = new Thread({
//             threadId:"abc",
//             title:"testing22"
//         });

//         const response = await thread.save();
//         res.send(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to save in DB"});
//     }

// });

//get thread
router.get("/thread", async(req,res)=>{
    try{
        const displayThread = await Thread.find({}).sort({updatedAt: -1}) //the "find" func will help to display all threads as history stored in db
          //and the sort func will sort the date acc to 'updatedAt' and -1 value will show data in descresing order
          //MOST RECENT DATA ON TOP
          res.json(displayThread);
    }catch(err){
        console.log(err);
    }
});

//send info of particular thread...get 1 chat
router.get("/thread/:threadId", async(req,res) => {
    const {threadId} = req.params;  //retrive thread id
    try{
        const oneThread = await Thread.findOne({threadId}); //find one thread of that id
        if(!oneThread){
            res.status(404).json({error : "thread not found"});
        }
        res.json(oneThread.messages);
    }catch(err)
    {
        console.log(err)
    }
});

//delete router
router.delete("/thread/:threadId", async(req,res) => {
    const {threadId} = req.params;  //retrive thread id
    try{
        const deletedThread = await Thread.findOneAndDelete({threadId}); //find one thread of that id and del it
        if(!deletedThread){
            res.status(404).json({error : "thread not found"});
        }
        res.status(200).json({success : "thread deleted"});
    }catch(err)
    {
        console.log(err)
    }
});

//chat router... which will send 'threadid' & 'msg' from F-end to B-end and then the B will send the 'msg' to opneAIAPI & 
// fetch response..save it in db and display back on the F-end

router.post("/chat", async(req,res)=>{
    const {threadId, messages} = req.body;

    if(!threadId || !messages) {
        res.status(404).json({error : "parameters missing"});
    }

    try{
        let thread = await Thread.findOne({threadId});
        
        if(!thread){
            //if id does not exist..create new id..and save in db
            thread = new Thread({
            threadId,
            title:messages,
            messages:[{role:"user", content:messages}] //**** */
            })
        }else{
            //if id exist save the role and msg within it
            thread.messages.push({role:"user", content:messages});
        }
        
        const assistantReply = await getOpenAIAPI_Response(messages); //use 'getResponse' from 'openai.js'. this will return response so save it
        thread.messages.push({role:"assistant", content:assistantReply}); //now push reply by telling its 'role' and the 'response from API' 
        thread.updatedAt = new Date(); //update the date
        await thread.save();
        res.json({reply : assistantReply});

    }catch(err){
        console.log(err)
        res.status(500).json({error : "something went wrong"});
    }
});

export default router;








