"use client";
import {
  Dialog,
  
  DialogContent,
  DialogDescription,
  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./button";       
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import { Input } from "./input";

import Markdown from "react-markdown";
import { toast } from "sonner";

function ChatToDocument({doc}:{doc:Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [input , setInput]=useState("");
  const [isPending, startTransition] = useTransition();
  const [question , setQuestion]=useState("")
  const handleAskQuestion = async (e :FormEvent) => {
    e.preventDefault();
    
    setQuestion(input);

const documentData= doc.get("document-string");
// const documentData = yText.toString();



    // console.log("Yjs document keys:", Array.from(doc.share.keys()));




    
    startTransition(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documentData,
            question: input,
          }),
        }
      );

      if (res.ok) {
  const data = await res.json();

  // Support both raw string and { response: string } object
  const answer =
    typeof data.message === "string"
      ? data.message
      : data.message?.response || JSON.stringify(data.message);

  setInput("");
  setSummary(answer);
  toast.success("answer served");
}

    });
    

    

    
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <Button asChild variant={"outline"}>
  <DialogTrigger > 
    <MessageCircleCode />
    chat to document
     </DialogTrigger></Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>ASk to document</DialogTitle>
      <DialogDescription>Ask question and chat to the document with Ai
        <hr className="mt-5"/>
          {question &&  <p className="mt-5 text-gray-500">Q : {question}</p> }
      </DialogDescription>
    </DialogHeader>
    {/* {summary && (
  <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
    <div className="flex">
      <BotIcon className="w-10 flex-shrink-0" />
      
         {isPending ? "is thinking" : "says"}
      
    </div>
    

  </div>
)} */}
{summary && (
  <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
    <div className="flex items-center gap-2">
      <BotIcon className="w-5 h-5 flex-shrink-0" />
      <span>{isPending ? "thinking..." : "says:"}</span>
    </div>

    {!isPending && (
      <div className="mt-2 text-gray-800 text-sm">
        <Markdown>{summary}</Markdown>
      </div>
    )}
  </div>
)}


    
   
    <form   onSubmit={handleAskQuestion} className="flex">
    

      
    <Input
    placeholder="i.e what is this about?" 
     type="text" value={input}  className="w-full"
      onChange={(e)=>setInput(e.target.value) }  />

      <Button type="submit" variant={"secondary"}
         disabled={!input ||  isPending}  > 
       {isPending? "Asking..." : "Ask"}
       </Button>
       
    
    


    </form>
  </DialogContent>
</Dialog>

    
  )
}

export default ChatToDocument