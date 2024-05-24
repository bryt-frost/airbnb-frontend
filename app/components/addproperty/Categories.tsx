import Image from 'next/image';

interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

const Categories = ({ dataCategory, setCategory }: CategoriesProps) => {
  return (
    <>
      <div className='pt-3 cursor-pointer  pb-6 flex  items-center space-x-12 '>
        <div
          onClick={() => {
            setCategory('Beach');
          }}
          className={`pb-4 flex flex-col  items-center space-y-2 border-b-2  ${
            dataCategory === 'Beach' ? 'border-gray-800' : ' border-white'
          } opacity-60 hover:opacity-100  hover:border-gray-500`}>
          <Image src='/kcm.jpg' alt='category' height={20} width={20} />
          <span className='text-xs'>Beach</span>
        </div>

        <div
          onClick={() => {
            setCategory('Vilas');
          }}
          className={`pb-4 flex flex-col  items-center space-y-2 border-b-2  ${
            dataCategory === 'Vilas' ? 'border-gray-800' : ' border-white'
          }  opacity-60 hover:opacity-100  hover:border-gray-500`}>
          <Image src='/kcm.jpg' alt='category' height={20} width={20} />
          <span className='text-xs'>Vilas</span>
        </div>

        <div
          onClick={() => {
            setCategory('Cabins');
          }}
          className={`pb-4 flex flex-col  items-center space-y-2 border-b-2  ${
            dataCategory === 'Cabins' ? 'border-gray-800' : ' border-white'
          } opacity-60 hover:opacity-100  hover:border-gray-500`}>
          <Image src='/kcm.jpg' alt='category' height={20} width={20} />
          <span className='text-xs'>Cabins</span>
        </div>

        <div
          onClick={() => {
            setCategory('Tiny house');
          }}
          className={`pb-4 flex flex-col  items-center space-y-2 border-b-2  ${
            dataCategory === 'Tiny house' ? 'border-gray-800' : ' border-white'
          } opacity-60 hover:opacity-100  hover:border-gray-500`}>
          <Image src='/kcm.jpg' alt='category' height={20} width={20} />
          <span className='text-xs'>Tiny house</span>
        </div>
      </div>
    </>
  );
};
export default Categories;
