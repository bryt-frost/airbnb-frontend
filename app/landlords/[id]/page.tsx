import ContactButton from '@/app/components/landlords/ContactButton';
import PropertyList from '@/app/components/property/PropertyList';
import apiServive from '@/app/services/apiServices';
import { getUserId } from '@/lib/actions';
import Image from 'next/image';


const LandlordDetailPage =async ({ params }: { params: { id: string } }) => {
  const landlord = await apiServive.get(`auth/${params.id}`);
  console.log(params.id);
  
  const  userId=await getUserId();
  return (
    <div className='max-w-[1500px] mx-auto px-6'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <aside className='col-span-1 mb-4'>
          <div className='flex flex-col  items-center p-6  rounded-xl border border-gray-300 shadow-xl'>
            <Image
              src={landlord.avatar_url}
              alt='property1'
              width={200}
              height={200}
              className='rounded-full '
            />
            <h1 className='mt-6 text-2cl'>Landlord name</h1>
            {userId != params.id && (
              <ContactButton userId={userId} landlordId={params.id} />
            )}
          </div>
        </aside>
        <div className='cols-span-1 md:col-span-3 pl-0 md:pl-6'>
          <div className=' grid  grid-cols-1 md:grid-cols-3   gap-6'>
            <PropertyList landlord_id={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDetailPage;
