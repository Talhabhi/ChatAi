"use client ";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FormEvent, useEffect, useState, useTransition } from "react";
import Editor from "./ui/Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./ui/DeleteDocument";
import InviteUser from "./ui/InviteUser";
import ManageUsers from "./ui/ManageUsers";
import Avatars from "./ui/Avatars";


function Document({ id }: { id: string }) {
  const [data, error, loading] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();
useEffect(()=>{
    if (data) {
        setInput(data.title)
        
    }

}, [data])


  const updatTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div className="flex-1 bg-white p-5">
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        {/* {update} title  */}

        <form className="flex flex-1 space-x-2"  onSubmit= {updatTitle} >
          <Input value={input}
            placeholder="Update document title"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "is updating ... " : "update"}
          </Button>
          
          
          {isOwner   && (
            <>
            <InviteUser/>
            <DeleteDocument/>
            </>

          )
          
          }
          
        </form>
        
      </div>
      <div className="flex  max-w-6xl mx-auto justify-between mb-5">
        <ManageUsers/>
        <Avatars/>
        

      </div>
      
    
      

      <div>
      </div>
      <Editor/>
    </div>
  );
}
export default Document;
