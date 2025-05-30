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
} from "@/components/ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./button";       
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "./input";
import { inviteUserToDocument } from "../../../actions/actions";

// import { deleteDocument } from "../../../actions/actions";

function InviteUser() {
  const [isOpen  , setIsOpen] = useState(false);

  const [email , setEmail] = useState("");
  const [isPending , startTransition] = useTransition();
  const pathName = usePathname();
  const router = useRouter();
  const handleInvite = async (e :FormEvent) => {
    e.preventDefault();
    const roomId = pathName.split("/").pop();
    if(!roomId) return
    startTransition( async () => {
      const {success} = await inviteUserToDocument (roomId , email);
      if(success){
        setIsOpen(false);
        setEmail("");

        toast.success("User added to room successfully");
      }else{
        toast.success("user is not added");

      }
      
    } )

    
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <Button asChild variant={"outline"}>
  <DialogTrigger  >Invite User</DialogTrigger></Button>
  <DialogContent>
    
   
    <form   onSubmit={handleInvite} className="flex">
    

      
    <Input 
    placeholder="Email" 
     type="email" value={email}  className="w-full"
      onChange={(e)=>setEmail(e.target.value) }  />

      <Button type="submit" variant={"secondary"}
         disabled={!email ||  isPending}  > 
       {isPending? "inviting..." : "invite"}
       </Button>
       
    
    


    </form>
  </DialogContent>
</Dialog>

    
  )
}

export default InviteUser