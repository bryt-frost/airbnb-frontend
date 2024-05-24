'use client';

import { ConversationType } from '@/app/inbox/page';
import CustomButton from '../CustomButton';
import useWebsocket, { ReadyState } from 'react-use-websocket';
import { useEffect, useState, useRef } from 'react';
import { MessageType } from '@/app/inbox/[id]/page';
import { UserType } from '@/app/inbox/page';

interface ConversationDetailProps {
  conversation: ConversationType;
  messages: MessageType[];
  userId: string;
  token: string;
}

const ConversationDetail = ({
  conversation,
  userId,
  token,
  messages,
}: ConversationDetailProps) => {
  const messagesDiv = useRef(null);
  const [newMessage, setNewMessage] = useState('');
  const [realTimeMessages, setRealTimeMessages] = useState<MessageType[]>([]);
  const myUser = conversation?.users?.find((user) => user.id == userId);
  const otherUser = conversation?.users?.find((user) => user.id != userId);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebsocket(
    `ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => false,
    },
  );

  useEffect(() => {
    console.log('CONNECTED', readyState);
  }, [readyState]);
  useEffect(() => {
    scrollToBottom();
  }, []);
  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === 'object' &&
      'name' in lastJsonMessage &&
      'body' in lastJsonMessage
    ) {
      const message: MessageType = {
        id: '',
        name: lastJsonMessage.name as string,
        conversationId: conversation.id,
        body: lastJsonMessage.body as string,
        sent_to: otherUser as UserType,
        created_by: myUser as UserType,
      };
      setRealTimeMessages((realTimeMessages) => [...realTimeMessages, message]);
    }
    scrollToBottom();
  }, [lastJsonMessage]);

  const scrollToBottom = () => {
    if (messagesDiv.current) {
      const scrollDiv = messagesDiv.current as HTMLDivElement;
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }
  };

  const sendMessage = async () => {
    sendJsonMessage({
      event: 'chat_message',
      data: {
        body: newMessage,
        name: myUser?.name,
        sent_to_id: otherUser?.id,
        conversation_id: conversation.id,
      },
    });
    setNewMessage('');
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };
  return (
    <>
      <div
        ref={messagesDiv}
        className='max-h-[400px] overflow-auto flex flex-col space-y-4'>
        {messages?.map((message, index) => (
          <div
            key={index}
            className={`w-[80% py-4 px-6 rounded-xl ${
              message.created_by.name === myUser?.name
                ? 'ml-[20%] bg-blue-200'
                : 'bg-gray-200 mr-[20%]'
            }`}>
            <p className='font-bold text-gray-500'>{message.created_by.name}</p>
            <p>{message.body}</p>
          </div>
        ))}
        {realTimeMessages?.map((message, index) => (
          <div
            key={index}
            className={`w-[80% py-4 px-6 rounded-xl ${
              message.name === myUser?.name
                ? 'ml-[20%] bg-blue-200'
                : 'bg-gray-200 mr-[20%]'
            }`}>
            <p className='font-bold text-gray-500'>{message.name}</p>
            <p>{message.body}</p>
          </div>
        ))}
      </div>
      <div className='space-x-4 mt-4 py-4 px-6 flex  border border-gray-300 rounded-xl'>
        <input
          type='text'
          placeholder='Type a message'
          className='w-full p-2 bg-gray-200 rounded-xl'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <CustomButton
          className='w-[100px]'
          label='Send'
          onClick={sendMessage}
        />
      </div>
    </>
  );
};
export default ConversationDetail;
