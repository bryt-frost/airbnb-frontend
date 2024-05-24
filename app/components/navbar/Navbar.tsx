import Image from 'next/image';
import Link from 'next/link';
import SearchFilters from './SearchFilters';
import UserNav from './UserNav';
import AddPropertyButton from './AddPropertyButton';
import { getUserId } from '@/lib/actions';


const Navbar = async () => {
  
    const userId = await getUserId();

  return (
    <div className='w-full top-0 left-0 fixed  py-6 border-b  bg-white z-10'>
      <div className='max-w-[1500px] mx-auto px-6'>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <Image src='/logo.png' alt='logo' width={180} height={38} />
          </Link>
          <div className='flex space-x-6'>
            <SearchFilters />
          </div>
          <div className='flex items-center space-x-6 '>
            <AddPropertyButton userId={userId} />
            <UserNav userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;