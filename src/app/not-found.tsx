import { PageNotFoundAnimation } from '@/components/lottieanimation/pagenotfound'
import React from 'react'

function NotFound() {
    return (
        <div className='p-4 flex items-center justify-center h-screen w-full'>
            <PageNotFoundAnimation />
        </div>
    )
}

export default NotFound