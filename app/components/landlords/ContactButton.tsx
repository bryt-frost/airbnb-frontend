'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import apiServive from '@/app/services/apiServices';
import { useRouter } from 'next/navigation';

interface ContactButtonProps {
  userId: string | null;
  landlordId: string;
}

const ContactButton = ({ userId, landlordId }: ContactButtonProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const startConversation = async () => {
    console.log('clicked');
    
    if (userId) {
      const conversation = await apiServive.get(`chat/start/${landlordId}`);
      if (conversation.conversation_id) {
        router.push(`/inbox/${conversation.conversation_id}`);
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={startConversation}
      className='cursor-pointer hover:bg-airbnbDark transition py-4 px-6 text-white rounded-xl mt-6 bg-airbnb'>
      Contact
    </div>
  );
};
export default ContactButton;
