import { client } from "@/sanity/lib/client"; // Update the path to your `client.ts` file

export const fetchAdminOrders = async () => {
  const query = `
    *[_type == "order"] | order(_createdAt desc) {
      _id,
      "buyer": user->name,
      "email": user->email,
      items[] {
        name,
        quantity,
        price,
        "imageUrl": image.asset->url
      },
      shippingAddress,
      status,
      _createdAt,
      "totalPrice": sum(items[].quantity * items[].price)
    }
  `;
  return client.fetch(query);
};
