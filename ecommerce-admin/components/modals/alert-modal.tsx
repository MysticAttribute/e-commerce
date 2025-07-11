"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { StoreModal } from "./store-modal"


interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {  
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="Are you Sure?"
            description="This action cannot be undone."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex items-center justify-end w-full pt-6 space-x-2">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    )
}