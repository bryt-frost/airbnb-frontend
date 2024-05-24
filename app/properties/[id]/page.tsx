import ReservationSidebar from '@/app/components/property/ReservationSidebar';
import apiServive from '@/app/services/apiServices';
import { getUserId } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {

  const property = await apiServive.get(`properties/${params.id}`);
  const userId =await getUserId();
  console.log(property);
  
  return (
    <div className='max-w-[1500px] mx-auto px-6'>
      <div className='w-full h-[64vh] overflow-hidden roundedx-xl relative mb-4'>
        <Image
          fill
          src={property.image_url}
          alt='property1'
          className='object-cover w-full h-full'
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4 pb-6'>
        <div className='py-6 pr-6 col-span-3'>
          <h1 className='mb-4  text-4xl'>{property?.title}</h1>
          <span className='mb-6 block text-lg text-gray-600'>
            {property?.guests} guests - {property?.bedrooms} bedrooms - 1
            {property?.bathrooms} bathrooms
          </span>
          <hr />
          <Link href={`/landlords/${property.landlord.id}`} className='py-6 flex  items-center space-x-4 '>
            {property?.landlord.avatar_url && (
              <Image
                src={property?.landlord.avatar_url}
                alt={property.title}
                width={50}
                height={50}
                className='rounded-full aspect-square'
              />
            )}

            <p>
              <strong>{property?.landlord.name}</strong> is your host
            </p>
          </Link>
          <hr />

          <p className='mt-6 text-lg'>{property.description}</p>
        </div>

        <ReservationSidebar userId={userId} property={property} />
      </div>
    </div>
  );
};
export default PropertyDetailPage;
