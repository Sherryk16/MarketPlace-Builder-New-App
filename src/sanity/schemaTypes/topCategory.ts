

export default {
    name: 'topCategory',
    type: 'document',
    title: 'Top Categories',
    
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
      { name: 'colour', type: 'string', title: 'Colour' },
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
      { name: 'section', type: 'string', title: 'Section', initialValue: 'Top' },
    ],
  };
  