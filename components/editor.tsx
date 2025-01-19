"use client"

import{
    BlockNoteEditor,
    PartialBlock,
} from "@blocknote/core";


import { useCreateBlockNote } from "@blocknote/react"

import { BlockNoteView } from "@blocknote/mantine"

import "@blocknote/mantine/style.css"

import { useTheme } from "next-themes";

interface IEditorProps{
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

export default function Editor({ onChange, initialContent, editable } : IEditorProps){
    
    const { resolvedTheme } = useTheme();

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    });

    editor.onEditorContentChange = () => {onChange(JSON.stringify(editor.document, null, 2))}
    
    return(
        <div>
            <BlockNoteView editor={editor} theme={ resolvedTheme === "dark" ? "dark" : "light" }>

            </BlockNoteView>
        </div>
    );
}
