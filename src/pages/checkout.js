import React from "react";
import Header from "./components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "./components/CheckoutProduct";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";
import { groupBy } from "lodash";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [sesion] = useSession();
  const groupedItems = Object.values(groupBy(items, "id"));

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: sesion.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your basket is Empty"
                : "Your Shopping Basket"}
            </h1>

            {groupedItems.map((group, i) => (
              <CheckoutProduct
                key={i}
                id={group[0].id}
                title={group[0].title}
                price={group[0].price}
                description={group[0].description}
                category={group[0].category}
                image={group[0].image}
                hasPrime={group[0].hasPrime}
                rating={group[0].rating}
                quantity={group.length}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold text-xl">
                  <Currency quantity={total} currency="USD" />
                </span>
              </h2>

              <button
                role={"link"}
                onClick={createCheckoutSession}
                disabled={!sesion}
                className={`button mt-2 ${
                  !sesion &&
                  "from-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!sesion ? "Sign In to checkout" : "Procede to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
