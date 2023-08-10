export const formatPrice = (amount: number | null) => {
  if (!amount) return "N/A";

  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount / 100);
};
