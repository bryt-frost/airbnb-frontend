'use client';

import useSearchModal, { SearchQuery } from '@/app/hooks/useSearchModal';
import Modal from './Modal';
import SelectCountries, { selectCountryValue } from '../SelectCountries';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import { Range } from 'react-date-range';
import DatePicker from '../Calendar';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const SearchModal = () => {
  const searchModal = useSearchModal();
  const [country, setcountry] = useState<selectCountryValue>();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [numGuests, setNumGuests] = useState<string>('1');
  const [numBedrooms, setNumBedrooms] = useState<string>('0');
  const [numBathrooms, setNumBathrooms] = useState<string>('0');

  const _setDateRange = (selection: Range) => {
    if (searchModal.step === 'checkin') {
      searchModal.open('checkout');
    } else if (searchModal.step === 'checkout') {
      searchModal.open('details');
    }

    setDateRange(selection);
  };

  const closeAndSearch = async () => {
    const newSearchQuery: SearchQuery = {
      country: country?.label ?? '',
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(numGuests),
      bedrooms: parseInt(numBedrooms),
      bathrooms: parseInt(numBathrooms),
      category: '',
    };

    searchModal.setQuery(newSearchQuery);
    searchModal.close();
  };
  let content = <></>;
  const contentLocation = (
    <>
      <h2 className='mb-6 text-xl'>Where do you want to go?</h2>
      <SelectCountries
        onChange={(value) => setcountry(value as selectCountryValue)}
        value={country}
      />
      <div className='mt-6 flex  flex-row gap-4'>
        <CustomButton
          onClick={() => searchModal.open('checkin')}
          label='check in date ->'
          className=''
        />
      </div>
    </>
  );

  const contentCheckIn = (
    <>
      <h2 className='mb-6 text-xl'>When do you want to check in?</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />
      <div className='mt-6 flex  flex-row gap-4'>
        <CustomButton
          onClick={() => searchModal.open('location')}
          label='location'
          className=''
        />
        <CustomButton
          onClick={() => searchModal.open('checkout')}
          label='check out date ->'
          className=''
        />
      </div>
    </>
  );

  const contentCheckOut = (
    <>
      <h2 className='mb-6 text-xl'>When do you want to check out?</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />
      <div className='mt-6 flex  flex-row gap-4'>
        <CustomButton
          onClick={() => searchModal.open('checkin')}
          label='Check in date'
          className=''
        />
        <CustomButton
          onClick={() => searchModal.open('details')}
          label='details'
          className=''
        />
      </div>
    </>
  );

  const contentDetails = (
    <>
      <h2 className='mb-6 text-xl'>Details</h2>

      <div className='space-y-4'>
        <div className='space-y-4'>
          <label htmlFor='guests'>Number of guests</label>
          <input
            type='number'
            min={1}
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            name=''
            id=''
            className='w-full h-14 px-4  border border-gray-300 rounded-xl'
          />
        </div>

        <div className='space-y-4'>
          <label htmlFor='guests'>Number of bedrooms</label>
          <input
            type='number'
            min={0}
            value={numBedrooms}
            onChange={(e) => setNumBedrooms(e.target.value)}
            name=''
            id=''
            className='w-full h-14 px-4  border border-gray-300 rounded-xl'
          />
        </div>

        <div className='space-y-4'>
          <label htmlFor='guests'>Number of bathrooms</label>
          <input
            type='number'
            min={0}
            value={numBathrooms}
            onChange={(e) => setNumBathrooms(e.target.value)}
            name=''
            id=''
            className='w-full h-14 px-4  border border-gray-300 rounded-xl'
          />
        </div>
      </div>
      <div className='mt-6 flex  flex-row gap-4'>
        <CustomButton
          onClick={() => searchModal.open('checkout')}
          label='Check out date'
          className=''
        />
        <CustomButton onClick={closeAndSearch} label='Search' className='' />
      </div>
    </>
  );

  if (searchModal.step == 'location') {
    content = contentLocation;
  } else if (searchModal.step == 'checkin') {
    content = contentCheckIn;
  } else if (searchModal.step == 'checkout') {
    content = contentCheckOut;
  } else if (searchModal.step == 'details') {
    content = contentDetails;
  }
  return (
    <Modal
      content={content}
      label={'Search'}
      isOpen={searchModal.isOpen}
      close={searchModal.close}
    />
  );
};
export default SearchModal;
