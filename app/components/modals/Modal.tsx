'use client';

import { DoorClosed, PanelTopClose, SidebarClose } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  label: string;
  content: React.ReactElement;
  isOpen: boolean;
  close: () => void;
}

const Modal: React.FC<Props> = ({ label, content, isOpen, close }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      close();
    }, 300);
  }, [close]);

  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`flex items-center justify-center fixed inset-0  left-0 z-40 bg-black/50  duration-300 ${
        showModal ? ' opacity-100' : ' opacity-10'
      }`}>
      <div className='w-[90%] md:w-[80%]  relative lg:w-[700px]  my-6 h-auto mx-auto'>
        <div
          className={`translate duration-500 h-full ${
            showModal
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-10'
          }`}>
          <div className='w-full h-auto rounded-xl relative flex flex-col bg-white'>
            <header className=' h-[60px] flex items-center p-6 rounded-xl justify-center relative border-b'>
              <div
                onClick={handleClose}
                className='p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer'>
                <svg
          
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18 18 6M6 6l12 12'
                  />
                </svg>
              </div>
              <h2 className='font-bold text-lg'>{label}</h2>
            </header>

            <section className='p-6'>{content}</section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
