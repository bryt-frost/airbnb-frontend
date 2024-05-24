'use client';
import Select from 'react-select';
import useCountries from '../hooks/useCountry';

export type selectCountryValue = {
  label: string;
  value: string;
};

interface selectCountryProps {
  value?: selectCountryValue;
  onChange: (value: selectCountryValue) => void;
}

const SelectCountries = ({ value, onChange }: selectCountryProps) => {
  const { getAll } = useCountries();
  return (
    <>
      <Select
        value={value}
        placeholder='anywhere'
        isClearable
        options={getAll()}
        onChange={(value) => onChange(value as selectCountryValue)}
      />
    </>
  );
};
export default SelectCountries;
