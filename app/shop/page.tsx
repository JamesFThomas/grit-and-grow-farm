import type { Metadata } from "next";
import { ShopPage } from "@/components/pages/Shop/ShopPage";

export const metadata: Metadata = {
  title: "Shop | Grit And Grow Farm",
  description:
    "The Grit And Grow Farm shop is not open yet. Big Pot Boxes pair our vegetables and spices with the recipes to cook them.",
};

export default function Shop() {
  return <ShopPage />;
}
