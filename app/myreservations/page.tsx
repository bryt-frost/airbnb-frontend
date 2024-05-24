import Image from 'next/image';
import apiServive from '../services/apiServices';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MyReservationsPage = async () => {
  const reservations = await apiServive.get('auth/reservations');
  return (
    <div className='max-w-[1500px] mx-auto px-6'>
      <div className='pt-6 pb-2'>
        <h1 className='text-4xl'>My Reservations</h1>

        <div className='space-y-4'>
          {reservations?.map((reservation: any) => {
            return (
              <div className='p-5  grid grid-cols-4 gap-4 border  border-gray-300 shadow-md rounded-xl'>
                <div className='col-span-1'>
                  <div className='relative overflow-hidden aspect-square rounded-xl'>
                    <Image
                      src={reservation.property.image_url}
                      alt='property'
                      fill
                      className='hover:scale-110 object-cover transition h-full w-full'
                    />
                  </div>
                </div>

                <div className='col-span-3 space-y-2'>
                  <h1 className='mb-4 text-xl'>
                    {' '}
                    {reservation.property.title}
                  </h1>
                  <p>
                    <strong>Check in date</strong>
                    {reservation.start_date}
                  </p>

                  <p>
                    <strong>Check out date</strong> {reservation.end_date}
                  </p>

                  <p>
                    <strong>Number of nights</strong>{' '}
                    {reservation.number_of_nights}
                  </p>

                  <p>
                    <strong>Total price</strong> ${reservation.total_price}
                  </p>

                  <Link
                    href={`/properties/${reservation.property.id}`}
                    className='cursor-pointer bg-airbnb transition hover:bg-airbnbDark py-4 px-6 rounded-xl mt-6 text-white text-center inline-block'>
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyReservationsPage;
