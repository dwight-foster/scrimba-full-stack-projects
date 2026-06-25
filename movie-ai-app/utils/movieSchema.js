export const movieSchema = {
    type: 'json_schema',
    json_schema: {
        name: 'movie_suggestions',
        schema: {
            type: 'object',
            properties: {
                movies: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: {type: 'string'},
                            year: {type: 'string'},
                            description: { type: 'string' }
                        },
                        required: ['name', 'year', 'description']
                    },
                },
            },
            required: ['movies'],
        },
    },
};