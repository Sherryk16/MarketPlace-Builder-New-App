import { defineType, defineField } from "sanity";

export default defineType({
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    defineField({
      name: "orderId",
      type: "string",
      title: "Order ID",
    }),
    defineField({
      name: "shippingAddress",
      type: "object",
      title: "Shipping Address",
      fields: [
        defineField({ name: "name", type: "string", title: "Name" }),
        defineField({ name: "address", type: "string", title: "Address" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "country", type: "string", title: "Country" }),
        defineField({ name: "postalCode", type: "string", title: "Postal Code" }),
      ],
    }),
    defineField({
      name: "contactInfo",
      type: "object",
      title: "Contact Information",
      fields: [
        defineField({ name: "email", type: "string", title: "Email" }),
        defineField({ name: "phone", type: "string", title: "Phone" }),
      ],
    }),
    defineField({
      name: "shipment",
      type: "reference",
      to: [{ type: "shipment" }],
      title: "Shipment",
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Order Status",
      options: {
        list: ["Pending", "Paid", "Shipped", "Delivered"],
      },
      initialValue: "Pending",
    }),
  ],
});
