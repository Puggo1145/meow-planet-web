import Image from "next/image";
import Link from "next/link";

export interface INewCatsItemProps {
  id: string;
  image: string;
  name: string;
}

export const NewCatsItem = ({
  id,
  image,
  name,
}: INewCatsItemProps) => {
  return (
    <li className="w-36 shrink-0">
      <Link 
        href={`/cats/${id}`}
        className="flex flex-col gap-y-1 cursor-pointer"
      >
        <div className="relative h-48 w-full">
          <Image
            src={image}
            fill
            sizes="100"
            className="object-cover rounded-xl
              cursor-pointer transition-all duration-150 hover:brightness-75"
            alt={`${name} cat`}
          />
        </div>
        <p className="ml-1 font-bold">
          {name}
        </p>
      </Link>
    </li>
  );
};
