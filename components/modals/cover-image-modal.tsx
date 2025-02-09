"use client"

import{
    Dialog, DialogContent, DialogHeader
} from "@/components/ui/dialog"

import { useCoverImage } from "@/hooks/use-cover-image";

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";

import update from "@/actions/updateDocument";

export default function CoverImageModal(){

    const params = useParams();

    const coverImage = useCoverImage();
    
    const [file, setFile] = useState<File>();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { edgestore } = useEdgeStore();

    function onClose() {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }

    async function onChange(file?: File) {
        if(file){
            setIsSubmitting(true);
            setFile(file);

            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url
                }
            });
            

            update({
                documentId: params.documentId as string,
                coverImage: res.url,
            });

            onClose();
        }
    }

    return(
        <Dialog open = {coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Изображение фона
                    </h2>
                </DialogHeader>
                <SingleImageDropzone className="w-full outline-none" disabled = {isSubmitting} value={file} onChange={onChange} />
            </DialogContent>
        </Dialog>
    );
}