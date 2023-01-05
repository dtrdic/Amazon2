import { MinusSmIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="block py-4 sm:grid sm:grid-cols-5 my-16 sm:my-3">
      <div className="text-center sm:text-left">
        <Image src={image} width={200} height={200} objectFit="contain" />
      </div>

      {/* Middle */}
      <div className="col-span-3 mx-5 mb-4 sm:mb-0">
        <p className="my-3">{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3 ">{description}</p>
        <div className="font-bold text-xl">
          <Currency quantity={price} currency="EUR" />
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* Buttons on the right of the products */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div className="flex justify-between xs:justify-start">
          <button className="button sm:p-1">
            <MinusSmIcon className="h-5 text-black" />
          </button>
          <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
            Quantity: <span className="font-bold"></span>
          </div>
          <button className="button sm:p-1">
            <PlusIcon className="h-5 text-black" />
          </button>
        </div>
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
