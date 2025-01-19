export default {
    name: 'mos',
    title: 'Medicine on Street',
    type: 'document',
    fields: [
        {
            name: 'category',
            title: 'Category',
            type: 'string',
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
            name: 'watchtime',
            title: 'Watch Time',
            type: 'string',
        },
        {
            name: 'videoId',
            title: 'VideoId',
            type: 'string',
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date',
          },
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
              hotspot: true,
            },
          },
    ]
}