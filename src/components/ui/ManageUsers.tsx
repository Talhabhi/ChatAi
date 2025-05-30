"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react"
import { Button } from "./button"

import { inviteUserToDocument, removeUserFromDocument } from "../../../actions/actions";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react";
import { collection, collectionGroup, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import { toast } from "sonner";


function ManageUsers() {
  const [isOpen  , setIsOpen] = useState(false);
  const {user} = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [usersInRoom] = useCollection(
    user && query(
      collectionGroup(db, "rooms"),
      where("roomId", "==", room.id)
    )
  );
  

  
  const [isPending , startTransition] = useTransition();
  
  
  const handleDelete = async (userId : string) => {
    startTransition (async () => {
      if (!user) return ;
      const {success} = await removeUserFromDocument (room.id , userId);
      if (success) {

        toast.success ("user removed from room successfully");

        
      }else{
        toast.error("Failed to remove user from room!");
      }
      
    })
   

    
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <Button asChild variant={"outline"}>
  <DialogTrigger  >Users ({usersInRoom?.docs.length})</DialogTrigger></Button>
  
  
  <DialogContent>
    <DialogHeader>
  <DialogDescription>
<DialogTitle>Users who are accessed</DialogTitle>
Below is a list of users who are accessed
</DialogDescription>
</DialogHeader>
 < hr className="my-2" />
<div >  

{usersInRoom?.docs.map((doc) => (
  <div key={doc.data().userId} className="flex items-center justify-between">
    <p className="font-light">
      {doc.data().userId === user?.emailAddresses[0].toString()
     ? `you (${doc.data().userId})`:
     doc.data().userId
      } 
    </p>
    <div className="flex items-center gap-2" >
      <Button variant={"outline"} >{doc.data().role }</Button>
      {isOwner &&
      
      doc.data().userId !== user?.emailAddresses[0].toString()
      && (
        <Button  variant="destructive"
        onClick={()=> handleDelete(doc.data().userId)}
        disabled= {isPending}
        size="sm"
        
        >
          {isPending ? "Removing ..." : 'X'}


        </Button>
      )
      }


    </div>
  </div>
))}

  

    

 
   </div>
   
    
  </DialogContent>
</Dialog>

    
  )
}

export default ManageUsers