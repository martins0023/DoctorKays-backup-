export default {
    name: 'policy',
    title: 'Policy',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 90,
            }
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{type: 'block'}],
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date',
        },
    ]
}