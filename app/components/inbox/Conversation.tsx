'use client';

import { useRouter } from 'next/navigation';

import { ConversationType } from '@/app/inbox/page';

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Conversation = ({ conversation, userId }: ConversationProps) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id != userId);
  return (
    <div className='px-6 py-4 border cursor-pointer border-gray-300 rounded-xl'>
      <p className='mb-6 text-xl'>{otherUser?.name}</p>

      <p
        onClick={() => router.push(`/inbox/${conversation.id}`)}
        className='text-airbnbDark'>
        Go to conversation
      </p>
    </div>
  );
};
export default Conversation;
