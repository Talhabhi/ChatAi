import { useRoom, useSelf } from "@liveblocks/react";
import React, { useState, useEffect } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./button";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { stringToColor } from "@/lib/stringToColor";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";


type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
};

function BlockNote({ doc, darkMode, provider }: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-string"),
      user: {
        name: userInfo?.name || "Anonymous",
        color: stringToColor(userInfo?.email!),
      }
    }
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={darkMode ? "dark" : "light"}
    />
  );
}

function Editor() {
  const room = useRoom();
  const [doc, setYDoc] = useState<Y.Doc | null>(null);
  const [provider, setYProvider] = useState<LiveblocksYjsProvider | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (room) {
      // Initialize YJS document
      const yDoc = new Y.Doc();

      // Initialize provider with the room and document
      const yjsProvider = new LiveblocksYjsProvider(room, yDoc);

      setYDoc(yDoc);
      setYProvider(yjsProvider);

      // Clean up on unmount
      return () => {
        yjsProvider.destroy();
        yDoc.destroy();
      };
    }
  }, [room]);

  const style = `hover:text-white ${
    darkMode
      ? "text-white bg-gray-800 hover:bg-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300"
  }`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-end p-4">
        {  <TranslateDocument  doc={doc}/>}
        {   <ChatToDocument  doc={doc}/>}
        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </Button>
      </div>
      
      {doc && provider ? (
        <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
      ) : (
        <div className="p-4 text-center">Loading editor...</div>
      )}
    </div>
  );
}

export default Editor;