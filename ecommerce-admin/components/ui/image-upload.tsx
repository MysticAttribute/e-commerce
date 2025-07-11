"use client"

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Trash, ImagePlus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";


interface ImageUploadProps {
    disabled: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
    singleImage?: boolean;
}   

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value, singleImage = false }) => {
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                onClick={() => onRemove(url)}
                                type="button"
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget
            uploadPreset="fuuvz215"
            options={{
                multiple: singleImage ? false : true,
                maxFiles: singleImage ? 1 : undefined,
            }}
            {...(singleImage ? { onSuccess: onUpload } : { onUpload: onUpload })}
            >
                {({ open }) => {
                    const onClick =() => {
                        open();
                    }

                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="mr-2 h-4 w-4" />
                            Upload an image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;