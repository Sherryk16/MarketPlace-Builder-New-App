

export default {
    name: 'latestProduct',
    type: 'document',
    title: 'Latest Product',
    
    fields: [
      { name: 'name', type: 'string', title: 'Name' },
      { name: 'price', type: 'number', title: 'Price' },
      { name: 'description', type: 'text', title: 'Description' },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: { hotspot: true },
      },
      {
        name: 'category',
        type: 'string',
        title: 'Category',
        to: [{ type: 'string' }],
      },
      { name: 'discountPrice', type: 'number', title: 'Discounted Price' },
      { name: 'rating', type: 'number', title: 'Rating' },
      {
        name: 'reviews',
        type: 'array',
        title: 'Reviews',
        of: [{ type: 'string' }],
      },
      { name: 'colour', type: 'string', title: 'Colour',of:[{type:'string'}] },
      { name: 'size', type: 'string', title: 'Size' },
      {
        name: 'tags',
        type: 'array',
        title: 'Tags',
        of: [{ type: 'string' }],
      },
      { name: 'code', type: 'string', title: 'Code' },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: { source: 'name' },
      },
     
      {
        name: 'section',
        type: 'string',
        title: 'Section',
        options: {
          list: [
            { title: 'New Arrival', value: 'new-arrival' },
            { title: 'Best Seller', value: 'best-seller' },
            { title: 'Feature', value: 'feature' },
            { title: 'Special Offer', value: 'special-offer' },
          ],
        },
      },
    ],
  };
  