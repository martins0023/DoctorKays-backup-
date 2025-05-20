export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'section',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'General'},
          {title: 'For Women', value: 'For women'},
          {title: 'For Men', value: 'For Men'},
          {title: 'Sex Education', value: 'Sex education'},
          {title: 'Pregnant Women', value: 'Pregnant women'},
          {title: 'Articles and Scripts', value: 'Articles and Scripts'},
        ],
      },
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
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'text', type: 'text', title: 'Comment' },
          { name: 'postedAt', type: 'datetime', title: 'When' },
        ]
      }]
    }
  ],
}
