// icon
import {
  SendIcon,
  ImageIcon,
  MapPinIcon
} from "lucide-react"
// ui
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
// types
import type { ComponentProps } from "react";


const FeedsReplyFnBtn = ({ children, ...props }: ComponentProps<'button'>) => {
  return (
    <Button
      variant="ghost"
      className="space-x-2 font-bold text-sm hover:bg-gray-200"
      {...props}
    >
      {children}
    </Button>
  )
};

export const FeedsUpload = () => {
  return (
    <section className="w-full bg-secondary rounded-2xl p-4">
      {/* TODO: replace original form with Form component */}
      <form className="flex flex-col gap-y-3">
        <Textarea
          className="flex-1 min-h-8"
        />

        <section className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <FeedsReplyFnBtn>
              <ImageIcon />
              <span>Image</span>
            </FeedsReplyFnBtn>
            <FeedsReplyFnBtn>
              <MapPinIcon />
              <span>Location</span>
            </FeedsReplyFnBtn>
          </div>
          <Button className="rounded-full px-6">
            <SendIcon size={20} />
          </Button>
        </section>
      </form>
    </section>
  )
}
