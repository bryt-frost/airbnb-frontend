'use client';

import { useEffect, useOptimistic, useState } from 'react';
import PropertyListItem from './PropertyListItem';
import apiServive from '@/app/services/apiServices';
import useSearchModal from '@/app/hooks/useSearchModal';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: String;
  is_favourite: boolean;
};
interface PropertyListProps {
  landlord_id?: string | null;
  favourites?: boolean;
}

const PropertyList = ({ landlord_id, favourites }: PropertyListProps) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const searchModal = useSearchModal();
  const country = searchModal.query.country;
  const bedrooms = searchModal.query.bedrooms;
  const bathrooms = searchModal.query.bathrooms;
  const numGuests = searchModal.query.guests;
  const category = searchModal.query.category;
  const checkIn = searchModal.query.checkIn;
  const checkOut = searchModal.query.checkOut;
  const params=useSearchParams()


  const markFavourite = (id: string, is_favourite: boolean) => {
    const tempProperties = properties.map((property: PropertyType) => {
      if ((property.id = id)) {
        property.is_favourite = is_favourite;
        if (property.is_favourite) {
          console.log('added  to  favourites');
        } else {
          console.log('removed from favs');
        }
      }
      return property;
    });
    setProperties(tempProperties);
  };

  let url = 'properties/';
  if (landlord_id) {
    url += `?landlord_id=${landlord_id}`;
  } else if (favourites) {
    url += `?is_favourites=true`;
  } else {
    let urlQuery = '';
    if (country) {
      urlQuery += '&country=' + country;
    }
    if (bedrooms) {
      urlQuery += '&bedrooms=' + bedrooms;
    }
    if (bathrooms) {
      urlQuery += '&bathrooms=' + bathrooms;
    }
    if (numGuests) {
      urlQuery += '&numGuests=' + numGuests;
    }
    if (category) {
      urlQuery += '&category=' + category;
    }
    if (checkIn) {
      urlQuery += '&check_in=' + format(checkIn, 'yyyy-MM-dd');
    }
    if (checkOut) {
      urlQuery += '&check_out=' + format(checkOut, 'yyyy-MM-dd');
    }

    if (urlQuery.length > 0) {
      console.log('Query:', url + urlQuery);
      urlQuery = '?' + urlQuery.substring(1);
      url += urlQuery;
    }
  }

  const getPropertiex = async () => {
    const tempProperties = await apiServive.get(url);
    setProperties(
      tempProperties.data.map((property: PropertyType) => {
        if (tempProperties.favourites.includes(property.id)) {
          property.is_favourite = true;
        } else {
          property.is_favourite = false;
        }
        return property;
      }),
    );
  };
  useEffect(() => {
    getPropertiex();
  }, [category, searchModal.query,params]);

  return (
    <>
      {properties?.map((property) => (
        <PropertyListItem
          markFavourite={(is_favourite) =>
            markFavourite(property.id, is_favourite)
          }
          property={property}
          key={property.id}
        />
      ))}
    </>
  );
};
export default PropertyList;
