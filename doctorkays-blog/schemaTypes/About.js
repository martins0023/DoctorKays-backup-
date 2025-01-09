export default {
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'about',
            title: 'About',
            type: 'array',
            of: [{type: 'block'}],
        },
        {
            name: 'about',
            title: 'About',
            type: 'array',
            of: [{type: 'block'}],
        }
    ]
}