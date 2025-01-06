import CallList from '@/components/CallList'
import { Disc } from 'lucide-react'
import React from 'react'

const recording = () => {
  return (
    <div>
    <section className='flex size-full flex-col gap-10 text-white'>
    <div className='flex flex-row gap-2'>
   <Disc className='mt-1' />
             
   <h1 className='text-2xl font-bold'>Recordings</h1>
            </div>
    
           
            
            <CallList type="recordings"></CallList>
        </section>
        </div>
  )
}

export default recording