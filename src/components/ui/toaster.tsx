"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            className="border-none bg-dark-1 text-white rounded-[6px] shadow-lg p-4 flex flex-col gap-2 min-w-[250px]" 
            key={id} 
            {...props}
          >
            <div className="grid gap-2">
              {title && (
                <ToastTitle className="font-semibold leading-none tracking-tight">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-sm text-gray-300">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="absolute right-1 top-1 rounded-md p-1 text-gray-300 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 hover:bg-gray-700" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  )
}