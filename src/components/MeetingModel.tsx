import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image'

import { Button } from './ui/button'

interface MeetingModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  children?: ReactNode
  handleClick?: () => void
  buttonText?: string
  image?: string
  buttonIcon?: string
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  children,
  handleClick,
  buttonText = 'Schedule Meeting',
  image,
  buttonIcon
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image
                src={image}
                alt="Modal illustration"
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
          )}
          
         
          
          {children}
          
          <Button 
            className="bg-blue-1 hover:bg-blue-600 rounded-[5px] transition-colors duration-200 focus-visible:ring-offset-2 focus-visible:ring-blue-400" 
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image 
                src={buttonIcon} 
                alt="Button icon"
                width={13} 
                height={13}
                className="mr-2"
              />
            )}
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal