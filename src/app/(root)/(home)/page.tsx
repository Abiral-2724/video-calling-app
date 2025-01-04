"use client"
import MeetingTypeList from '@/components/MeetingTypeList';
import React, { useState, useEffect } from 'react';

const Home = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            
            // Format time and convert PM to lowercase
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            
            // Format date
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            
            setTime(timeString);
            setDate(dateString);
        };
        
        // Update immediately
        updateDateTime();
        
        // Update every second
        const interval = setInterval(updateDateTime, 1000);
        
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="w-full min-h-screen p-4">
            <section className="flex size-full flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-white">
                <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full rounded-[16px] bg-hero bg-cover">
                    <div className="flex h-full flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-11">
                        <h2 className="glassmorphism max-w-[270px] rounded py-2 px-3 text-center text-sm sm:text-base font-normal">
                            Upcoming Meeting at : 12:30 <span>PM</span>
                        </h2>
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-extrabold">
                                {time}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-sky-400">
                                {date}
                            </p>
                        </div>
                    </div>
                </div>

                <MeetingTypeList></MeetingTypeList>
            </section>
        </div>
    );
};

export default Home;