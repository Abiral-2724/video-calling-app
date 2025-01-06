"use client"

import React from 'react';
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useGetCallById } from "../../../../../hooks/useGetCallById";
import Loader from "@/components/Loader";

export default function Page({params}: {params: Promise<{id: string}>}) {
    // Unwrap the params using React.use()
    const { id } = React.use(params);
    
    const {isLoaded} = useUser();
    const [isSetupComplete, setIsSetUpComplete] = useState(false);
    
    const {call, isCallLoading} = useGetCallById(id);
    
    if(!isLoaded || isCallLoading) {
        return <Loader />;
    }
    
    return (
        <div>
            <main className="h-screen w-full">
                <StreamCall call={call}>
                    <StreamTheme>
                    {
                        !isSetupComplete ? (
                            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
                        ) : (
                            <MeetingRoom />
                        )
                    }
                    </StreamTheme>
                </StreamCall>
            </main>
        </div>
    );
}