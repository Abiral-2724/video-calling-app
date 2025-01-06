import CallList from '@/components/CallList'
import { StepBack } from 'lucide-react'
import React from 'react'

const previous
 = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
   <div className='flex flex-row gap-2'>
   <StepBack className='mt-1' />
             
                <h1 className='text-2xl font-bold'>Previous Meetings</h1>
            </div>
    

    <CallList type="ended"></CallList>
</section>
  )
}

export default previous
