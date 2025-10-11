"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";

import { NewsletterModal } from "./newsletter-modal";


const InvertedModalTrigger = ({autoOpen = false}: {autoOpen?: boolean}) => {
  // Control the dialog's state, initializing it to 'true' to be open by default.
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (autoOpen) setTimeout(() => setIsOpen(true), 5000);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed top-1/2 right-0 z-[99] font-bold bg-black text-white px-8 py-6 rounded-none modal-btn">
          10% OFF
        </Button>
      </DialogTrigger>
      <NewsletterModal />
    </Dialog>
  );
};

export default InvertedModalTrigger;
