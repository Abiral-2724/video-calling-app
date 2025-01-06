import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'
  

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
const searchParams = useSearchParams() ;
    const isPersonalRoom = !!searchParams.get('personal')

    const [layout ,setLayout] = useState('speaker-left')

    const CallLayout = () => {
        switch(layout) {
            case 'grid' : 
                return <PaginatedGridLayout></PaginatedGridLayout>
            
            case 'speaker-right' :
                return <SpeakerLayout 
                participantsBarPosition="left" ></SpeakerLayout>

            default : 
            return <SpeakerLayout 
            participantsBarPosition="left"
            ></SpeakerLayout>

           
        }
    }

    const [showParticipants ,setShowParticipants]= useState(false) 

    const {useCallCallingState} = useCallStateHooks() ;

    const callingState = useCallCallingState() 

    if(callingState !== CallingState.JOINED){
        return <Loader></Loader>
    }
    const router = useRouter() ;

  return (
    <div>
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout></CallLayout>
                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2' ,{'show-block' : showParticipants})}>
                        <CallParticipantsList onClose={() => setShowParticipants(false)}></CallParticipantsList>
                </div>
            </div>
            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
                <CallControls 
                onLeave={() => router.push('/')}
                ></CallControls>
                <DropdownMenu>
  <div className='flex items-center'>
  <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
    <LayoutList size={20} className='text-white'></LayoutList>
  </DropdownMenuTrigger>
  </div>
  <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white rounded-[5px]'>
   { ['Grid' ,'Speaker-Left','Speaker-Right'].
   map((item,index) => (
    <div key={index}>
        <DropdownMenuItem className='cursor-pointer hover:bg-blue-400 hover:text-black' 
        onClick={() => {
            setLayout(item.toLocaleLowerCase() as CallLayoutType)
        }}
        >
            {item}
        </DropdownMenuItem>
        <DropdownMenuSeparator className='border-dark-1'></DropdownMenuSeparator>
    </div>
   ))
   
   
   }
  
  </DropdownMenuContent>
</DropdownMenu>
<CallStatsButton></CallStatsButton>
<Button onClick={() => setShowParticipants((prev) => !prev)}>
<div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
<Users></Users>
</div>

</Button>
{
    !isPersonalRoom && <EndCallButton></EndCallButton>
}
            </div>
        </section>
    </div>
  )
}

export default MeetingRoom