export default {
    name: 'services',
    title: 'Services',
    type: 'document',
    fields: [
        {
            name: 'icon',
            title: 'Icon',
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
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{type: 'block'}],
        }
    ]
}