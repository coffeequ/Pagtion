"use client"

import {
    BlockNoteSchema,
    combineByGroup,
    filterSuggestionItems,
    PartialBlock,
  } from "@blocknote/core";
  import { ru } from "@blocknote/core/locales";
  import "@blocknote/core/fonts/inter.css";
  import { BlockNoteView } from "@blocknote/mantine";
  import "@blocknote/mantine/style.css";
  import {
    SuggestionMenuController,
    getDefaultReactSlashMenuItems,
    useCreateBlockNote,
  } from "@blocknote/react";
  import {
    getMultiColumnSlashMenuItems,
    multiColumnDropCursor,
    locales as multiColumnLocales,
    withMultiColumn,
  } from "@blocknote/xl-multi-column";

import { useEdgeStore } from "@/lib/edgestore";
import { useTheme } from "next-themes";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useMemo } from "react";

interface IEditorProps{
    onChange: (value: string) => void;
    initialContent?: string | null;
    editable?: boolean;
}

function Editor({ onChange, initialContent, editable } : IEditorProps){
    
    const { resolvedTheme } = useTheme();

    // const others = useOthers();

    // const test = useSelf((me) => me.info);

    const { edgestore } = useEdgeStore();

    const debouncedOnChange = useDebounceCallback(onChange, 200);

    // useEffect(() => {
    //   console.log("others: ", others, "self: ", test);
    // }, [])

    async function handleUpload(file: File){
        
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    }


    const editor = useCreateBlockNote({
        schema: withMultiColumn(BlockNoteSchema.create()),
        dropCursor: multiColumnDropCursor,
        dictionary: {
            ...ru,
            multi_column: multiColumnLocales.ru,
          },
        uploadFile: handleUpload,
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    });

  const getSlashMenuItems = useMemo(() => {
    return async (query: string) =>
      filterSuggestionItems(
        combineByGroup(
          getDefaultReactSlashMenuItems(editor),
          getMultiColumnSlashMenuItems(editor)
        ),query);
  }, [editor]);

  useEffect(() => {
    editor.onChange(() => {debouncedOnChange(JSON.stringify(editor.document, null, 2))});
  }, [debouncedOnChange, editor]);
    
  return(
    <div>
      <BlockNoteView editor={editor} theme={ resolvedTheme === "dark" ? "dark" : "light" } editable = {editable} slashMenu={false}>
        <SuggestionMenuController triggerCharacter={"/"}  getItems={getSlashMenuItems}/>
      </BlockNoteView>
    </div>
  );
}

export default Editor;