import axios from "axios";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    price_data: {
      description: item.description,
      quantity: 1,
      currency: "USD",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.session.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1MNZZ1H9Bb2Vv8J1YSEy9Xhe"],
    shipping_adress_collection: {
      allowed_countries: ["US", "GB", "CA"],
    },
    line_items: transformedItems,
    mode: "payements",
    success_url: `${process.env.HOST}/success`,
    cancell_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).JSON({ id: session.id });
};
