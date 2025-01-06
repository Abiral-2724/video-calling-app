"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Table from '@/components/Table'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useGetCallById } from '../../../../../hooks/useGetCallById'
import { Video, Copy, Users } from 'lucide-react'

const PersonalRoom = () => {
  const { user } = useUser()
  const router = useRouter()
  const meetingId = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const client = useStreamVideoClient()
  const { toast } = useToast()
  const { call } = useGetCallById(meetingId!)

  const startRoom = async () => {
    if (!client || !user) {
      return
    }

    if (!call) {
      const newCall = client.call('default', meetingId!)
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  }

  return (
    <div className="min-h-screen p-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-2xl font-bold text-white">Personal Room</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-8">
            <div className="space-y-6">
              <InfoTable 
                title="Topic" 
                description={`${user?.username}'s Meeting Room`} 
                icon={<Users className="h-5 w-5 text-slate-400" />}
              />
              <InfoTable 
                title="Meeting ID" 
                description={meetingId!} 
                icon={<Video className="h-5 w-5 text-slate-400" />}
              />
              <InfoTable 
                title="Invite Link" 
                description={meetingLink} 
                icon={<Copy className="h-5 w-5 text-slate-400" />}
              />
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="bg-blue-500 rounded-[6px] hover:bg-blue-600 text-white px-6 py-2 flex items-center gap-2 transition-colors"
                onClick={startRoom}
              >
                <Video className="h-5 w-5" />
                Start Meeting
              </Button>
              
              <Button 
                className="bg-slate-700 rounded-[6px] hover:bg-slate-600 text-white px-6 py-2 flex items-center gap-2 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(meetingLink)
                  toast({
                    description: "Invitation link copied to clipboard",
                  })
                }}
              >
                <Copy className="h-5 w-5" />
                Copy Invitation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const InfoTable = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string
  description: string
  icon?: React.ReactNode
}) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <p className="text-base font-semibold text-white truncate">{description}</p>
      </div>
    </div>
  )
}

export default PersonalRoom