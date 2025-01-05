import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <div>
        <section className='flex size-full flex-col gap-10 text-white'>
            <h1 className='text-2xl font-bold'>Upcoming Meetings</h1>

            <CallList type="upcoming"></CallList>
        </section>
    </div>
  )
}

export default Upcoming