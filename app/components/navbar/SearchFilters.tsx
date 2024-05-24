'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import { Search } from 'lucide-react';

const SearchFilters = () => {
  const searchModal = useSearchModal();
  return (
    <div
      onClick={() => searchModal.open('location')}
      className='h-[48px] lg:h-[64px] flex flex-row items-center justify-between border  border-gray-100 rounded-full'>
      <div className=' hidden  lg:block'>
        <div className='flex  flex-row items-center justify-between'>
          <div className='cursor-pointer w-[250px] h-[48px] lg:h-[64px] px-8 flex flex-col  justify-center hover:bg-gray-100 rounded-full'>
            <p className='text-sm font-semibold'>Where</p>
            <p className='text-sm '>Wanted locations</p>
          </div>

          <div className='cursor-pointer  h-[48px] lg:h-[64px] px-8 flex flex-col  justify-center hover:bg-gray-100 rounded-full'>
            <p className='text-sm font-semibold'>Check in</p>
            <p className='text-sm '>Add dates</p>
          </div>

          <div className='cursor-pointer  h-[48px] lg:h-[64px] px-8 flex flex-col  justify-center hover:bg-gray-100 rounded-full'>
            <p className='text-sm font-semibold'>Check Out</p>
            <p className='text-sm '>Add dates</p>
          </div>

          <div className='cursor-pointer  h-[48px] lg:h-[64px] px-8 flex flex-col  justify-center hover:bg-gray-100 rounded-full'>
            <p className='text-sm font-semibold'>Who</p>
            <p className='text-sm '>Add guests</p>
          </div>
        </div>
      </div>
      <div className='  p-2'>
        <div className='p-2 lg:p-4 cursor-pointer hover:bg-airbnbDark transition rounded-full text-white  bg-airbnb'>
          <Search className='h-6 w-6' />
        </div>
      </div>
    </div>
  );
};
export default SearchFilters;
