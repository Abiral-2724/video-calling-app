"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

const MeetingSetup = ({setIsSetUpComplete} : {setIsSetUpComplete : (value : boolean) => void} ) => {
    const [isMicCamToggledOn, setIsMicCamToggleOn] = useState(false)
    const router = useRouter()
    const call = useCall()

    useEffect(() => {
        if(isMicCamToggledOn) {
            call?.camera.disable()
            call?.microphone.disable()
        } else {
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone])

    return (
        <div className='relative flex h-screen w-full flex-col'>
            {/* Back button */}
            <div className='absolute top-4 left-4'>
                <Button 
                    variant="ghost" 
                    className='flex items-center gap-2 text-white hover:text-gray-300'
                    onClick={() => router.push('/')}
                >
                    <ChevronLeft className="h-5 w-5" />
                    Back
                </Button>
            </div>

            {/* Main content */}
            <div className='flex flex-1 flex-col items-center justify-center gap-3 text-white'>
                <h1 className='text-2xl font-bold'>Setup</h1>
                <VideoPreview></VideoPreview>
                <div className='flex h-16 items-center justify-center gap-3'>
                    <label className='flex items-center justify-center gap-2 font-medium'>
                        <input
                            type='checkbox'
                            checked={isMicCamToggledOn}
                            onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
                        >
                        </input>
                        Join with mic and camera off 
                    </label>
                    <DeviceSettings></DeviceSettings>
                </div>
                <Button 
                    className='rounded-[6px] bg-green-700 hover:bg-green-600 px-4 py-2.5' 
                    onClick={() => {
                        call?.join()
                        setIsSetUpComplete(true)
                    }}
                >
                    Join meeting
                </Button>
            </div>
        </div>
    )
}

export default MeetingSetup