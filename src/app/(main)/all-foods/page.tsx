import React from "react";
import type { Metadata } from "next";
import AllFoodsClient from "@/components/all-foods/AllFoodsClient";


export const metadata: Metadata = {
  title: "Available Foods | ShareBite",
  description:
    "Browse and search available foods shared by the ShareBite community.",
};

const AllFoodsPage = () => {
  return <AllFoodsClient />;
};

export default AllFoodsPage;