import PropertyList from '@/app/components/property/PropertyList';
import { getUserId } from '@/lib/actions';

const MyPropertiesPage = async () => {
  3;
  const userId = await getUserId();
  return (
    <div className='max-w-[1500px] mx-auto px-6'>
      <h1 className='py-6 text-2xl'>My Properties</h1>
      <div className=' grid  grid-cols-1 md:grid-cols-4   gap-6'>
        <PropertyList landlord_id={userId} />
      </div>
    </div>
  );
};
export default MyPropertiesPage;
