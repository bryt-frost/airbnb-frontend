import { getUserId } from '@/lib/actions';
import PropertyList from '../components/property/PropertyList';

const MyFavourites = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className='max-w-[1500px] mx-auto  px-6 py-12'>
        <p>You need to be logged in</p>
      </main>
    );
  }
  return (
    <main className='max-w-[1500px] mx-auto  px-6 pb-12'>
      <h1 className='py-6 text-2xl'>My Favourites</h1>
      <div className=' grid  grid-cols-1 md:grid-cols-4   gap-6'>
        <PropertyList favourites={true} />
      </div>
    </main>
  );
};
export default MyFavourites;
