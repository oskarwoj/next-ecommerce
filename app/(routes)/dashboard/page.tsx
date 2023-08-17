import getOrders from "@/app/actions/getOrders";
import Dashboard from "@/components/Dashboard";

export const revalidate = 0;

const DashboardPage = async () => {
  const orders = await getOrders();

  return <Dashboard orders={orders} />;
};

export default DashboardPage;
