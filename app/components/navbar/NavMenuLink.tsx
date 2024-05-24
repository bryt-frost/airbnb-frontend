interface Props {
  label: string;
  onClick: () => void;
}

const NavMenuLink = ({ label, onClick }: Props) => {
  return (
    <div onClick={onClick} className='px-5 py-4 hover:bg-gray-100 transition'>
      {label}
    </div>
  );
};
export default NavMenuLink;
