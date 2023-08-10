import Stripe from "stripe";

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const products = await stripe.products.list();

  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
      });
      return {
        id: product.id,
        name: product.name,
        prices: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        metadata: product.metadata.features,
      };
    })
  );
  return productWithPrices;
};

export default async function Home() {
  const products = await getProducts();
  console.log(products);
  return (
    <main>
      <h1 className="text-4xl">Hello Next 13 🔥</h1>
    </main>
  );
}
