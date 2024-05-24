'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import useAddPropertyModal from '@/app/hooks/usePropertyModal';

interface AddPropertyButtonProps {
  userId?: string | null;
}

const AddPropertyButton = ({ userId }: AddPropertyButtonProps) => {
  const addPropertyModal = useAddPropertyModal();
  const loginModal = useLoginModal();
  const airbnbyourhome = () => {
    if (userId) {
      addPropertyModal.open();
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={airbnbyourhome}
      className=' cursor-pointer p-2 text-sm font-semibold rounded-full hover:bg-gray-100'>
      AddPropertyButton
    </div>
  );
};
export default AddPropertyButton;
