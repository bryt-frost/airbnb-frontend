'use client';

import Image from 'next/image';
import useSearchModal, { SearchQuery } from '../hooks/useSearchModal';
import { useState } from 'react';

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setcategory] = useState<string>();

  const _setCategory = (_category: string) => {
    setcategory(_category);
    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      category: _category,
    };
    searchModal.setQuery(query);
  };
  return (
    <div className='pt-3 cursor-pointer  pb-6 flex items-center space-x-12'>
      <div
        onClick={() => _setCategory('')}
        className={`pb-4 flex flex-col  items-center space-y-2 border-b-2 border-white  ${
          category == '' && 'border-b-black'
        } opacity-60 hover:opacity-100  hover:border-gray-500`}>
        <Image src='/kcm.jpg' alt='category' height={20} width={20} />
        <span className='text-xs'>All</span>
      </div>

      <div
        onClick={() => _setCategory('Beach')}
        className={`pb-4 flex flex-col  items-center space-y-2 border-b-2 border-white  ${
          category == 'Beach' && 'border-b-black'
        } opacity-60 hover:opacity-100  hover:border-gray-500`}>
        <Image src='/kcm.jpg' alt='category' height={20} width={20} />
        <span className='text-xs'>Beach</span>
      </div>

      <div
        onClick={() => _setCategory('Vilas')}
        className={`pb-4 flex flex-col  items-center space-y-2 border-b-2 border-white  ${
          category == 'Vilas' && 'border-b-black'
        } opacity-60 hover:opacity-100  hover:border-gray-500`}>
        <Image src='/kcm.jpg' alt='category' height={20} width={20} />
        <span className='text-xs'>Vilas</span>
      </div>

      <div
        onClick={() => _setCategory('Cabins')}
        className={`pb-4 flex flex-col  items-center space-y-2 border-b-2 border-white  ${
          category == 'Cabins' && 'border-b-black'
        } opacity-60 hover:opacity-100  hover:border-gray-500`}>
        <Image src='/kcm.jpg' alt='category' height={20} width={20} />
        <span className='text-xs'>Cabins</span>
      </div>

      <div
        onClick={() => _setCategory('Tiny house')}
        className={`pb-4 flex flex-col  items-center space-y-2 border-b-2 border-white  ${
          category == 'Tiny house' && 'border-b-black'
        } opacity-60 hover:opacity-100  hover:border-gray-500`}>
        <Image src='/kcm.jpg' alt='category' height={20} width={20} />
        <span className='text-xs'>Tiny house</span>
      </div>
    </div>
  );
};
export default Categories;
