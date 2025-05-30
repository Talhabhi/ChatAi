"use client";

import * as Y from 'yjs';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Markdown from "react-markdown";
// import { Input } from "./input";
import { Button } from "./button";
import { FormEvent, useState, useTransition } from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
// type Language =
// | "english"
// | "spanish"
// | "portuguese"
// | "japanese"
// | "hindi"
// | "french"
// | "german"
// | "arabic"
// | "chinese";
// const languages:Language [] = [
//   "english",
//  "spanish",
//  "portuguese",
//  "japanese",
//  "hindi",
//  "french",
//  "german",
//  "arabic",
//  "chinese",
  
// ]
type LanguageCode = "en" | "es" | "pt" | "ja" | "hi" | "fr" | "de" | "ar" | "zh";

const languages: { label: string; code: LanguageCode }[] = [
  { label: "English", code: "en" },
  { label: "Spanish", code: "es" },
  { label: "Portuguese", code: "pt" },
  { label: "Japanese", code: "ja" },
  { label: "Hindi", code: "hi" },
  { label: "French", code: "fr" },
  { label: "German", code: "de" },
  { label: "Arabic", code: "ar" },
  { label: "Chinese", code: "zh" },
];


function TranslateDocument( {doc} : { doc:Y.Doc }  ) {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [isPending, startTransition] = useTransition();
  const [question , setQuestion]=useState("")
  const [language, setLanguage] = useState<LanguageCode>("en");

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

   
const documentData = doc.get("document-string");



    
    startTransition(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documentData,
            targetLang: language,
          }),
        }
      );

      if (res.ok) {
        const { translated_text } = await res.json();
        setSummary(translated_text);
        toast.success("summarize successfully");
      } else {
        toast.error("summary failed");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <Button asChild variant={"outline"}>
  <DialogTrigger  > <LanguagesIcon>Translate</LanguagesIcon>Translate </DialogTrigger></Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        translate the document  </DialogTitle>
        <DialogDescription>
          select a language a AI will translate the summary        </DialogDescription>
          <hr className="mt-5"/>
          {question &&  <p className="mt-5 text-gray-500">Q : {question}</p> }
    </DialogHeader>
    
    {summary && (
  <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
    <div className="flex">
      <BotIcon className="w-10 flex-shrink-0" />
      <p className="font-bold">
        gpt {isPending ? "is thinking" : "says"}
      </p>
    </div>
    <div>
  {isPending ? "thinking..." : <Markdown>{summary}</Markdown>}
</div>

  </div>
)}

   
    <form   onSubmit={handleAskQuestion} className="flex">
    
<Select value={language} onValueChange={(value) => setLanguage(value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select a language" />
  </SelectTrigger>
  <SelectContent>
    {languages.map(({ label, code }) => (
      <SelectItem key={code} value={code}>
        {label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>


      <Button type="submit" variant={"secondary"} disabled={!language}>
  {isPending ? "Translating..." : "Translate"}
</Button>

       
    
    


    </form>
  </DialogContent>
</Dialog>

  )
}

export default TranslateDocument