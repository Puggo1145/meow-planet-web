import Image from "next/image";
import Link from "next/link";
// types
import type { StaticImageData } from "next/image";

export interface INewCatsItemProps {
  id: number;
  image: StaticImageData;
  name: string;
}

export const NewCatsItem: React.FC<INewCatsItemProps> = ({
  image,
  name,
}) => {
  return (
    <li className="w-36">
      <Link 
        href="/"
        className="flex flex-col gap-y-1 cursor-pointer"
      >
        <Image
          src={image}
          className="h-48 object-cover rounded-xl
            cursor-pointer transition-all duration-150 hover:brightness-75"
          alt="new cat"
        />
        <p className="ml-1 font-bold">
          {name}
        </p>
      </Link>
    </li>
  );
};
