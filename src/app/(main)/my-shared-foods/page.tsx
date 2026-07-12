import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const MySharedFoodsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const tokenData = await auth.api.getToken({ headers: await headers() });

  if (!session?.user) return <div>Please Login</div>;

  const userId = session.user.id; // এটিই আপনার আসল আইডি
  const token = tokenData?.token;

  let myFoods = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-shared-foods/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      myFoods = await res.json();
    } else {
      console.error("Fetch failed with status:", res.status);
    }
  } catch (err) {
    console.error("Error:", err);
  }

  console.log("Fetched myFoods:", myFoods);

  return (
    <div>
      <h1>My Shared Foods ({myFoods.length})</h1>
      {myFoods.map((food: any) => (
        <div key={food._id}>{food.foodName}</div>
      ))}
    </div>
  );
};

export default MySharedFoodsPage;