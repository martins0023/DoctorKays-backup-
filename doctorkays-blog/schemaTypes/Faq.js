export default {
    name: 'faq',
    title: 'Faq',
    type: 'document',
    fields: [
        {
            name: 'question',
            title: 'Question',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'question',
                maxLength: 90,
            }
        },
        {
            name: 'answer',
            title: 'Answer',
            type: 'array',
            of: [{type: 'block'}],
        }
    ]
}