"use client"
import { useState } from "react"
import Homecard from "./Homecard"
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";

const MeetingTypeList = () => {
    const [meetingState ,setMeetingState] = useState<'isScheduleMeetings' | 'isJoiningMeeting' | 'isInstantMeetings' | undefined> () ;
    const router = useRouter() ;

    const createMeeting = () => {
        
    }
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
            <MeetingModel
            isOpen = {meetingState === 'isInstantMeetings'}
            onClose={() => setMeetingState(undefined)}
            title="Start an Instant Meeting"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
            ></MeetingModel>
        </section>
    </div>
  )
}

export default MeetingTypeList