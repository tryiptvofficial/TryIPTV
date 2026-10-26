"use client";

import { useEffect, useActionState, type RefObject } from "react";
import dynamic from "next/dynamic";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/actions";

const ContactSheetForm = dynamic(() =>
  import("@/components/shared/ContactSheetForm").then((mod) => mod.ContactSheetForm)
);

/**
 * The contact sheet itself (Radix dialog, form state, toasts). ContactSheet loads it on the first
 * tap so pages don't download or hydrate Radix up front. It stays mounted after closing, so the
 * form result (useActionState) survives.
 */
export function ContactSheetPanel({
  open,
  onOpenChange,
  triggerRef,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const { toast } = useToast();
  const initialState = { message: null, errors: null };
  const [state, dispatch] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Success!",
        description: state.message,
      });
      const timer = setTimeout(() => onOpenChange(false), 0);
      return () => clearTimeout(timer);
    } else if (state.message && state.errors) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast, onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {open && (
        <SheetContent
          // There is no Radix trigger, so return focus to the chat button by hand.
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <SheetHeader>
            <SheetTitle>Contact Us</SheetTitle>
            <SheetDescription>
              Have a question or need support? Fill out the form below and we&apos;ll get back to you shortly.
            </SheetDescription>
          </SheetHeader>
          <ContactSheetForm state={state} dispatch={dispatch} />
        </SheetContent>
      )}
    </Sheet>
  );
}
