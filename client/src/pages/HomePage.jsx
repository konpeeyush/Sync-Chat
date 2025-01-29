import React from 'react'
import { useChatStore } from '../store/useChatStore'

import { ChatContainer, Sidebar, NoChatSelected } from '../components';

const HomePage = () => {
    const { selectedUser } = useChatStore();
    return (
        <div className='h-screen bg-base-200 '>
            <div className='flex items-center justify-center pt-20 px-4'></div>
            <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] border-2'>
                <div className='flex h-full rounded-lg overflow-hidden'>
                    <Sidebar />
                    {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                </div>
            </div>
        </div>
    )
}

export default HomePage