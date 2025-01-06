import { SignIn } from '@clerk/nextjs'


const SignInPage = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
        <main>
            <SignIn></SignIn>
        </main>
    </div>
  )
}

export default SignInPage