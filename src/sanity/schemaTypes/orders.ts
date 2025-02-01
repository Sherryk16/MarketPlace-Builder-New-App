export default {
  name: 'orders',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }], // Reference to the user who placed the order
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'orderItem',
          title: 'Order Item',
          fields: [
            { name: 'name', title: 'Product Name', type: 'string' },
            { name: 'quantity', title: 'Quantity', type: 'number' },
            { name: 'price', title: 'Price', type: 'number' },
            { name: 'image', title: 'Product Image', type: 'image' },
            { name: 'slug', title: 'Product Slug', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        { name: 'name', title: 'Full Name', type: 'string' }, // ✅ Added Name
        { name: 'email', title: 'Email', type: 'string' }, // ✅ Added Email
        { name: 'phone', title: 'Phone Number', type: 'string' }, // ✅ Added Phone
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'apartment', title: 'Apartment', type: 'string' }, // ✅ Added Apartment
        { name: 'city', title: 'City', type: 'string' },
        { name: 'postalCode', title: 'Postal Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
        { name: 'deliveryMethod',
          title: 'Delivery Method',
          type: 'string',}
      ],
    },
    {
      name: 'deliveryMethod',
      title: 'Delivery Method',
      type: 'string', // ✅ Now Defined
    },
    {
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: ['paid', 'not paid'],
      },
    },
    {
      name: 'total',
      title: 'Total Price',
      type: 'number',
    },
    {
      name: 'paymentDetails',
      title: 'Payment Details',
      type: 'object',
      fields: [
        { name: 'id', title: 'Payment ID', type: 'string' },
        { name: 'status', title: 'Payment Status', type: 'string' },
        { name: 'amount', title: 'Amount Paid', type: 'number' },
        { name: 'currency', title: 'Currency', type: 'string' },
      ],
    },
  ],
};
