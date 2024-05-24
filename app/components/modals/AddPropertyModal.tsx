'use client';

import Image from 'next/image';
import Modal from './Modal';
import useAddPropertyModal from '@/app/hooks/usePropertyModal';
import { Content } from 'next/font/google';
import LoginModal from './LoginModal';
import CustomButton from '../CustomButton';
import { ChangeEvent, useEffect, useState } from 'react';
import Categories from '../addproperty/Categories';
import SelectCountries, { selectCountryValue } from '../SelectCountries';
import apiServive from '@/app/services/apiServices';
import { useRouter } from 'next/navigation';

const AddPropertyModal = () => {
  const router = useRouter();
  const addPropertyModal = useAddPropertyModal();
  const [errors, setErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState('');
  const [dataTitle, setDataTitle] = useState('');
  const [dataDescription, setDataDescription] = useState('');
  const [dataprice, setDataPrice] = useState('');
  const [dataBedrooms, setDataBedrooms] = useState('');
  const [dataBathrooms, setDataBathrooms] = useState('');
  const [dataGuests, setDataGuests] = useState('');
  const [dataImage, setDataImage] = useState<File | null>(null);
  const [dataCountry, setDataCountry] = useState<selectCountryValue>();

  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tempImage = event.target.files[0];
      setDataImage(tempImage);
    }
  };

  const submitForm = async () => {
    if (
      dataTitle &&
      dataBathrooms &&
      dataBedrooms &&
      dataCategory &&
      dataCountry &&
      dataDescription &&
      dataprice &&
      dataImage
    ) {
      const formData = new FormData();
      formData.append('category', dataCategory);
      formData.append('title', dataTitle);
      formData.append('description', dataDescription);
      formData.append('price_per_night', dataprice);
      formData.append('bedrooms', dataBedrooms);
      formData.append('bathrooms', dataBathrooms);
      formData.append('guests', dataGuests);
      formData.append('country', dataCountry.label);
      formData.append('country_code', dataCountry.value);
      formData.append('image', dataImage);
      const response = await apiServive.post('properties/create/', formData);

      if (response.success) {
        console.log('Success :-D');
        router.push('/?added=true');
        addPropertyModal.close();
      } else {
        console.log('Error');
        const tempErrors: string[] = Object.values(response).map(
          (error: any) => {
            return error;
          },
        );
        setErrors(tempErrors);
      }
    }
  };
  const content = (
    <>
      {currentStep === 1 ? (
        <>
          <h2 className='mb-6 text-2xl'>Choose category</h2>

          <Categories
            dataCategory={dataCategory}
            setCategory={(category) => {
              setCategory(category);
            }}
          />
          <CustomButton
            className=''
            label='Next'
            onClick={() => setCurrentStep(2)}
          />
        </>
      ) : currentStep == 2 ? (
        <>
          {' '}
          <h2 className='mb-6 text-2xl'>Describe your place</h2>
          <div className='pt-3 pb-6 space-y-4'>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
                name=''
                id=''
                className='w-full p-4 border border-gray-600  rounded-xl'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='description'>Description</label>
              <textarea
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
                name=''
                id=''
                maxLength={500}
                className='w-full h-[200px] p-4 border border-gray-600  rounded-xl'
              />
              <textarea></textarea>
            </div>
          </div>
          <CustomButton
            className='mb-2 bg-black  hover:bg-gray-800'
            label='Previous'
            onClick={() => setCurrentStep(1)}
          />
          <CustomButton
            className=''
            label='Next'
            onClick={() => setCurrentStep(3)}
          />
        </>
      ) : currentStep == 3 ? (
        <>
          {' '}
          <h2 className='mb-6 text-2xl'>Details</h2>
          <div className='pt-3 pb-6 space-y-4'>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                value={dataprice}
                onChange={(e) => setDataPrice(e.target.value)}
                name=''
                id=''
                className='w-full p-4 border border-gray-600  rounded-xl'
              />
            </div>

            <div className='flex flex-col space-y-2'>
              <label htmlFor='bedrooms'>Bedrooms</label>
              <input
                type='number'
                value={dataBedrooms}
                onChange={(e) => setDataBedrooms(e.target.value)}
                name=''
                id=''
                className='w-full p-4 border border-gray-600  rounded-xl'
              />
            </div>

            <div className='flex flex-col space-y-2'>
              <label htmlFor='bathrooms'>Bathrooms</label>
              <input
                type='number'
                value={dataBathrooms}
                onChange={(e) => setDataBathrooms(e.target.value)}
                name=''
                id=''
                className='w-full p-4 border border-gray-600  rounded-xl'
              />
            </div>

            <div className='flex flex-col space-y-2'>
              <label htmlFor='guests'>Guests</label>
              <input
                type='number'
                value={dataGuests}
                onChange={(e) => setDataGuests(e.target.value)}
                name=''
                id=''
                className='w-full p-4 border border-gray-600  rounded-xl'
              />
            </div>
          </div>
          <CustomButton
            className='mb-2 bg-black  hover:bg-gray-800'
            label='Previous'
            onClick={() => setCurrentStep(2)}
          />
          <CustomButton
            className=''
            label='Next'
            onClick={() => setCurrentStep(4)}
          />
        </>
      ) : currentStep == 4 ? (
        <>
          <h2 className='mb-6 text-2xl'>Location</h2>
          <div className='pt-3 pb-6 space-y-4'>
            <SelectCountries
              value={dataCountry}
              onChange={(value) => setDataCountry(value as selectCountryValue)}
            />
          </div>
          <CustomButton
            className='mb-2 bg-black  hover:bg-gray-800'
            label='Previous'
            onClick={() => setCurrentStep(3)}
          />
          <CustomButton
            className=''
            label='Next'
            onClick={() => setCurrentStep(5)}
          />
        </>
      ) : (
        <>
          {' '}
          <h2 className='mb-6 text-2xl'>Image</h2>
          <div className='pt-3 pb-6 space-y-4'>
            <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
              <input type='file' accept='image/*' onChange={setImage} />
            </div>

            {dataImage && (
              <div className='w-[200px] relative  h-[150px]'>
                <Image
                  fill
                  alt='preview'
                  src={URL.createObjectURL(dataImage)}
                  className='w-full h-full object-cover rounded-xl'
                />
              </div>
            )}
          </div>
          {errors?.map((error, index) => (
            <div className='p-5 mb-4  bg-airbnb text-white rounded-xl opacity-80'>
              {error}
            </div>
          ))}
          <CustomButton
            className='mb-2 bg-black  hover:bg-gray-800'
            label='Previous'
            onClick={() => setCurrentStep(4)}
          />
          <CustomButton className='' label='Submit' onClick={submitForm} />
        </>
      )}
    </>
  );
  return (
    <Modal
      isOpen={addPropertyModal.isOpen}
      close={addPropertyModal.close}
      label='Add property'
      content={content}
    />
  );
};
export default AddPropertyModal;
