"use client"

import{
    BlockNoteEditor,
    PartialBlock,
} from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"

import { useEdgeStore } from "@/lib/edgestore";
import { useTheme } from "next-themes";
//import { useDebounceCallback } from "usehooks-ts";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect } from "react";
import { throttle } from "lodash";


interface IEditorProps{
    onChange: (value: string) => void;
    initialContent?: string | null;
    editable?: boolean;
}

function Editor({ onChange, initialContent, editable } : IEditorProps){
    
    const { resolvedTheme } = useTheme();

    const { edgestore } = useEdgeStore();

    const debouncedOnChange = useDebounceCallback(onChange, 200);

    async function handleUpload(file: File){
        
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload
    });

   useEffect(() => {
    editor.onEditorContentChange(() => {debouncedOnChange(JSON.stringify(editor.document, null, 2))});
   }, [debouncedOnChange, editor]);
    
    return(
        <div>
            <BlockNoteView editor={editor} theme={ resolvedTheme === "dark" ? "dark" : "light" } editable = {editable}>

            </BlockNoteView>
        </div>
    );
}

export default Editor;


