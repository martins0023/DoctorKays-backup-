export default {
    name: 'shop',
    title: 'Shop',
    type: 'document',
    fields: [
        {
            name: 'icon',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image'}],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'product',
            title: 'Product',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'product',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'string',
        },
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'string',
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{type: 'block'}],
        }
    ]
}