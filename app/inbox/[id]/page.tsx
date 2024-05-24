import ConversationDetail from '@/app/components/inbox/ConversationDetail';

import { getAccessToken, getUserId } from '@/lib/actions';

import { UserType } from '../page';
import apiServive from '@/app/services/apiServices';

export type MessageType = {
  id: string;
  name: string;
  conversationId: string;
  body: string;
  sent_to: UserType;
  created_by: UserType;
};
const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const token = await getAccessToken();

  if (!userId ||!token) {
    return (
      <main className='max-w-[1500px] mx-auto  px-6 py-12'>
        <p>You need to be logged in</p>
      </main>
    );
  }
  const conversation = await apiServive.get(`chat/${params.id}`);
  return (
    <main className='max-w-[1500px] mx-auto px-6 '>
      <ConversationDetail
        token={token}
        userId={userId}
        conversation={conversation.conversation}
        messages={conversation.messages}
      />
    </main>
  );
};
export default ConversationPage;
