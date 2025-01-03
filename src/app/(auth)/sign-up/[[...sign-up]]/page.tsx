import {  SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
        <main>
            <SignUp></SignUp>
        </main>
    </div>
  )
}

export default SignUpPage