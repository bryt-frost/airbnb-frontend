import Conversation from '@/app/components/inbox/Conversation';
import apiServive from '../services/apiServices';
import { useEffect, useState } from 'react';
import { getUserId } from '@/lib/actions';

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
};

export type ConversationType = {
  id: string;
  users: UserType[];
};

const InboxPage = async ({}) => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className='max-w-[1500px] mx-auto  px-6 py-12'>
        <p>You need to be logged in</p>
      </main>
    );
  }

  const conversations = await apiServive.get(`chat`);
  return (
    <div className='max-w-[1500px] mx-auto px-6 space-y-4'>
      <h1 className='py-6 text-2xl'>Inbox</h1>
      {conversations?.map((conversation: ConversationType) => {
        return (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            userId={userId}
            
          />
        );
      })}
    </div>
  );
};

export default InboxPage;
