import CallList from '@/components/CallList'
import { Calendar } from 'lucide-react'
import React from 'react'

const Upcoming = () => {
  return (
    <div>
        <section className='flex size-full flex-col gap-10 text-white'>
            <div className='flex flex-row gap-2'>
                <Calendar className='mt-1'></Calendar>
            <h1 className='text-2xl font-bold'> Upcoming Meetings</h1>
            
            </div>
            
            <CallList type="upcoming"></CallList>
        </section>
    </div>
  )
}

export default Upcoming