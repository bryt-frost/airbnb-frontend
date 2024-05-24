'use client';
import useLoginModal from '@/app/hooks/useLoginModal';
import apiServive from '@/app/services/apiServices';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Range } from 'react-date-range';
import { differenceInDays, eachDayOfInterval, format } from 'date-fns';
import DatePicker from '../Calendar';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

export type Property = {
  id: string;
  price_per_night: number;
  guests: number;
};

interface ReservationSidebarProps {
  userId: string | null;
  property: Property;
}

const ReservationSidebar = ({ property, userId }: ReservationSidebarProps) => {
  const loginModal = useLoginModal();
  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [guests, setGuests] = useState<string>('1');
  const guestsRange = Array.from(
    { length: property.guests },
    (_, index) => index + 1,
  );

  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }
    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };
  const getReservations = async () => {
    const reservations = await apiServive.get(
      `properties/${property.id}/reservations`,
    );
    let dates: Date[] = [];
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date),
      });
  dates = dates.concat(range);
    });
    setBookedDates(dates);
  };
  useEffect(() => {
    getReservations();
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && property.price_per_night) {
        const _fee = ((dayCount * property.price_per_night) / 100) * 5;
        setFee(_fee);
        setTotalPrice(dayCount * property.price_per_night + _fee);
        setNights(dayCount);
      } else {
        const _fee = (property.price_per_night / 100) * 5;
        setFee(_fee);
        setTotalPrice(property.price_per_night + _fee);
        setNights(1);
      }
    }
  }, [dateRange]);

  const performBooking = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData();
        formData.append('guests', guests);
        formData.append('start_date', format(dateRange.startDate, 'yyy-MM-dd'));
        formData.append('end_date', format(dateRange.endDate, 'yyy-MM-dd'));
        formData.append('number_of_nights', nights.toString());
        formData.append('total_price', totalPrice.toString());
        const response = await apiServive.post(
          `properties/${property.id}/book/`,
          formData,
        );
        if (response.success) {
          console.log('booking successfull');
        } else {
          console.log('booking failed');
        }
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <aside className='p-6 col-span-2 rounded-xl border-gray-300  shadow-xl mt-6  '>
      <h2 className='mb-5 text-2xl'>${property.price_per_night} per night</h2>
      <DatePicker
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => _setDateRange(value.selection)}
      />
      <div className='mb-6 p-3 border boerder-gray-400 rounded-xl'>
        <label htmlFor='' className='block  mb-2 font-bold  text-sm'>
          Guests
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          name=''
          id=''
          className='w-full  -ml-1 p-4'>
          {guestsRange.map((number) => (
            <option className='p-4 h-14' key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <div
        onClick={performBooking}
        className='w-full mb-6 py-4 text-center text-white bg-airbnb hover:bg-airbnbDark  rounded-xl transition'>
        Book
      </div>
      <div className='mb-4 flex justify-between align-center'>
        <p>
          ${property.price_per_night} x {nights}
        </p>
        <p>${property.price_per_night * nights}</p>
      </div>

      <div className='mb-4 flex justify-between align-center'>
        <p>bnb fee: </p>
        <p>${fee}</p>
      </div>
      <hr />
      <div className='mt-4 flex justify-between font-bold align-center'>
        <p>Total: </p>
        <p>${totalPrice}</p>
      </div>
    </aside>
  );
};
export default ReservationSidebar;
