interface Props {
  label: string;
  onClick: () => void;
  className: string;
}

const CustomButton = ({ label, onClick, className }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`py-4 w-full bg-airbnb hover:bg-airbnbDark transition cursor-pointer text-white rounded-xl  text-center ${className}`}>
      {' '}
      {label}
    </div>
  );
};
export default CustomButton;
