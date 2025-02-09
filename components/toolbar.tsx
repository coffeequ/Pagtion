"use client"

import IconPicker from "./icon-picker";
import { Button } from "@/components/ui/button";
import { Flashlight, ImageIcon, Smile, X } from "lucide-react";
import { ComponentRef, use, useRef, useState } from "react";

import TextareaAutosize from "react-textarea-autosize"
import { useCoverImage } from "@/hooks/use-cover-image";
import { Document } from "@prisma/client";

import update from "@/actions/updateDocument";
import removeIcon from "@/actions/removeIconDocument";

interface IToolbarProps {
    initialData: Document
    preview?: boolean,
}

export default function Toolbar({ initialData, preview } : IToolbarProps){

    const inputRef = useRef<ComponentRef<"textarea">>(null);

    const [isEditing, setIsEditing] = useState(false);

    const [value, setValue] = useState(initialData.title);

    const coverImage = useCoverImage();

    function enableInput() {
        if(preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
            console.log("Метод сработал");
        }, 0);
    }

    function disableInput(){
        setIsEditing(false);
    }

    function onInput(value: string) {
        setValue(value);
        update({
            documentId: initialData.id,
            title: value || "Untitled"
        });
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>){
        if(event.key === "Enter"){
            event.preventDefault();
            disableInput();
        }
    }

    function onIconSelect(icon: string){
        update({
            documentId: initialData.id,
            icon
        });
    }

    function onIconRemove(){
        removeIcon(initialData.id);
    }

    return(
        <div className="pl-[54px] group relative">
            {
                !!initialData.icon && !preview && (
                    <div className="flex items-center gap-x-2 group/icon pt-6">
                        <IconPicker onChange={onIconSelect}>
                            <p className="text-6xl hover:opacity-75 transition">
                                {initialData.icon}
                            </p>
                            <Button onClick={onIconRemove} className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs" variant='outline' size="icon">
                                <X className="h-4 w-4"/>
                            </Button>
                        </IconPicker>
                    </div>
                )
            }
            {
                !!initialData.icon && preview && (
                    <p className="text-6xl pt-6">
                        {initialData.icon}
                    </p>
                )
            }
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {
                    !initialData.icon && !preview && (
                        <IconPicker asChild onChange={onIconSelect}>
                            <Button className="text-muted-foreground text-xs" variant="outline">
                                <Smile className="h-4 w-4 mr-2" />
                                Добавить иконку
                            </Button>
                        </IconPicker>
                    )
                }
                {
                    !initialData.coverImage && !preview && (
                        <Button onClick={coverImage.onOpen} className="text-muted-foreground text-xs" variant="outline">
                            <ImageIcon className="h-4 w-4 mr-2"/>
                            Добавить задний фон
                        </Button>
                    )
                }
            </div>
            {
                isEditing && !preview ? (
                    <TextareaAutosize 
                        ref={inputRef}
                        onBlur={disableInput}
                        onKeyDown={onKeyDown}
                        value={value}
                        onChange={(e) => onInput(e.target.value)}
                        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                    />
                ): (
                    <div onClick={enableInput} className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]">
                        {initialData.title}
                    </div>
                )
            }
        </div>
    );    
}