"use client"
import { useState } from "react"
import Homecard from "./Homecard"
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";

import DateTimePicker from "./DateTimePicker";
import { Input } from "./ui/input";
const MeetingTypeList = () => {
    const [meetingState ,setMeetingState] = useState<'isScheduleMeetings' | 'isJoiningMeeting' | 'isInstantMeetings' | undefined> () ;
    const router = useRouter() ;
    const [values ,setValues] = useState({
        dateTime : new Date() ,
        description : '' ,
        link : ''
    })

    const [callDetails ,setCallDetails] = useState<Call>() ;
    const { toast } = useToast()

const {user} = useUser() ;
const client = useStreamVideoClient()

    const createMeeting = async () => {
            if(!client || !user){
                return ;
            }

            try{
                if(!values.dateTime){
                    toast({
                        variant: "destructive",
                        title: "Please select date and time",
                      })
                      return ;
                }
                const id = crypto.randomUUID() ;
                const call = client.call('default' ,id) ;

                if(!call){
                    throw new Error('failed to create call')
                }

                const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString() ;
                const description = values.description || 'Instant meeting'

                await call.getOrCreate({
                    data:{
                        starts_at : startAt ,
                        custom : {
                            description
                        }
                    }
                })

                setCallDetails(call) ;
                if(!values.description){
                    router.push(`/meeting/${call.id}`)
                }
                toast({
                    title: "Meeting created Successfully",
                  })
            }       
            catch(error){
                console.log(error) ;
                toast({
                    variant: "destructive",
                    title: "Failed to create meeting",
                  })
            }
    }


const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <div>
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Homecard 
            img="/icons/add-meeting.svg"
            title="New Meeting"
            description="Start an instant meeting"
            handleClick={() => setMeetingState('isInstantMeetings')}
            className="bg-orange-1"
            ></Homecard>
            <Homecard
             img="/icons/schedule.svg"
             title="Schedule Meeting"
             description="Plan your meeting"
             handleClick={() => setMeetingState('isScheduleMeetings')}
              className="bg-blue-1"
            ></Homecard>
            <Homecard
             img="/icons/recordings.svg"
             title="View Recordings"
             description="Check out your recordings"
             handleClick={() => router.push('/recordings')}
              className="bg-purple-1"
            ></Homecard>
            <Homecard
             img="/icons/join-meeting.svg"
             title="Join Meeting"
             description="via invitation link"
             handleClick={() => setMeetingState('isJoiningMeeting')}
              className="bg-yellow-1"
            ></Homecard>

                {
                    !callDetails ? (
                        <MeetingModel
                        isOpen = {meetingState === 'isScheduleMeetings'}
                        onClose={() => setMeetingState(undefined)}
                        title="Create Meeting"
                        handleClick={createMeeting}
                        >

                          <div className="flex flex-col gap-2.5">
                            <label className="text-base text-normal leading-[22px] text-sky-2">Add a description</label>
                            <Textarea className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0" 
                            onChange={(e) => {
                                setValues({...values ,description:e.target.value})
                            }}
                            />

                          </div> 

                          <div className="flex w-full flex-col gap-2.5">
                          <label className="text-base text-normal leading-[22px] text-sky-2">Select date and time</label>
                           

                          <DateTimePicker
    date={values.dateTime} 
    setDate={(date : any) => setValues({...values, dateTime: date})} 
  />
                          </div>

                        </MeetingModel>
                    ) : (
                        <MeetingModel
                        isOpen = {meetingState === 'isScheduleMeetings'}
                        onClose={() => setMeetingState(undefined)}
                        title="Meeting Created"
                        className="text-center"
                        handleClick={() => {
                            
                            navigator.clipboard.writeText(meetingLink) 
                            toast({title:'Link copied successfully'})
                        }}
                        image="/icons/checked.svg"
                        buttonIcon="/icons/copy.svg"
                        buttonText="Copy Meeting Link"
                        ></MeetingModel>
                    )
                }

<MeetingModel
            isOpen = {meetingState === 'isInstantMeetings'}
            onClose={() => setMeetingState(undefined)}
            title="Start an Instant Meeting"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
            ></MeetingModel>


<MeetingModel
            isOpen = {meetingState === 'isJoiningMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Type the Meeting link"
            className="text-center"
            buttonText="Join Meeting"
            handleClick={() => router.push(values.link)}
            >
                <Input
                placeholder="Meeting link"
                className="rounded-[5px] bg-transparent border-spacing-1"
                onChange={(e) => setValues({...values ,link:e.target.value})}
                ></Input>

            </MeetingModel>

           
        </section>
    </div>
  )
}

export default MeetingTypeList