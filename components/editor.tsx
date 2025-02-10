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

interface IEditorProps{
    onChange: (value: string) => void;
    initialContent?: string | null;
    editable?: boolean;
}

function Editor({ onChange, initialContent, editable } : IEditorProps){
    
    const { resolvedTheme } = useTheme();

    const { edgestore } = useEdgeStore();

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

    //Метод работает
   editor.onEditorContentChange(() => {onChange(JSON.stringify(editor.document, null, 2))});

    // const uploadToDatabase = useCallback(
    //     debounce(() => {
    //         onChange(JSON.stringify(editor.document));
    //     }, 300), // set any time you want
    //     [editor, onChange]
    // );
    // const uploadToDataBase = () => {
    //     if(onChange){
    //         onChange(JSON.stringify(editor.document, null, 2));
    //     }
    // }
    
    return(
        <div>
            <BlockNoteView editor={editor} theme={ resolvedTheme === "dark" ? "dark" : "light" } editable = {editable}>

            </BlockNoteView>
        </div>
    );
}

export default Editor;
