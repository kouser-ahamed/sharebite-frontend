import MySharedFoodsClient from "@/components/MySharedFoodsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

interface Food {
  _id: string;
  foodName: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  ownerName: string;
  imageUrl: string;
  expiryDate: string;
  preparationDate: string;
  servingSize: string;
  contactNumber: string;
  isHalal: boolean;
  userId: string;
  userEmail: string;
  status: string;
  views: number;
  requests: number;
  createdAt: string;
  updatedAt: string;
}

const MySharedFoodsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const tokenData = await auth.api.getToken({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] dark:bg-black">
        <div className="text-center p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800">
          <p className="text-slate-600 dark:text-zinc-400 text-lg font-semibold">Please Login</p>
          <p className="text-sm text-slate-400 dark:text-zinc-500 mt-1">You need to be logged in to view your shared foods.</p>
          <Link href="/login" className="mt-4 inline-block px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  let myFoods: Food[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-shared-foods/${session.user.id}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenData?.token}` 
      },
      cache: "no-store",
    });
    if (res.ok) myFoods = await res.json();
  } catch (error) { 
    console.error("Fetch error:", error); 
  }

  return <MySharedFoodsClient initialFoods={myFoods} token={tokenData?.token} userId={session.user.id} />;
};

export default MySharedFoodsPage;