import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'SkillForge Connect API',
            version: '1.0.0',
            description: 'APIs for Skillforge application',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
            {
                url: 'https://skillforge.onrender.com',
                description: 'Production server',
            },
        ],
        tags: [
            {
                name: 'Auth',
                description: 'User API',
            },
            {
                name: 'Class',
                description: 'Class API',
            },
            {
                name: 'Event',
                description: 'Events API',
            }
        ],
        paths: {
            "/api/user/setup-admin": {
                post: {
                    tags: ['Auth'],
                    description: 'Setup admin user',
                    responses: {
                        '201': {
                            description: 'Admin user created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Admin user created successfully',
                                            },
                                            token: {
                                                type: 'string',
                                                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTlhYzRkZjRlNTBhNzAyZGVhYWRmOWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDQ2NDE3NjB9.R0fVjq9P3wY6_dhU-eto8YtbkR7LDVzPFHM3R6nUjP8',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '409': {
                            description: 'Admin user already exists',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Admin user already exists',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/user/register-admin": {
                post: {
                    tags: ['Auth'],
                    description: 'Register admin user',
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        username: {
                                            type: 'string',
                                            example: 'AdminTestTwo',
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'admintesttwo@gmail.com',
                                        },
                                        password: {
                                            type: 'string',
                                            example: 'phpartisan',
                                        },
                                    },
                                    required: ['username', 'email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Admin user created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Admin created successfully',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/user/get-users": {
                get: {
                    tags: ['Auth'],
                    description: 'Get all users',
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Get all users',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                role: {
                                                    type: 'string',
                                                    example: 'user',
                                                },
                                                _id: {
                                                    type: 'string',
                                                    example: '657ed25208cc8dea2da8d994',
                                                },
                                                username: {
                                                    type: 'string',
                                                    example: 'test',
                                                },
                                                email: {
                                                    type: 'string',
                                                    example: 'test@gmail.com',
                                                },
                                                createdAt: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example: '2023-12-17T10:49:54.078Z',
                                                },
                                                updatedAt: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example: '2023-12-17T10:49:54.078Z',
                                                },
                                                __v: {
                                                    type: 'integer',
                                                    example: 0,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/user/register": {
                post: {
                    tags: ['Auth'],
                    description: 'Register a new user',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        username: {
                                            type: 'string',
                                            example: 'test10',
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'test10@gmail.com',
                                        },
                                        password: {
                                            type: 'string',
                                            example: 'phpartisan',
                                        },
                                    },
                                    required: ['username', 'email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'User created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'User created successfully',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/user/login": {
                post: {
                    tags: ['Auth'],
                    description: 'Login user',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: {
                                            type: 'string',
                                            example: 'mrkaplan@gmail.com',
                                        },
                                        password: {
                                            type: 'string',
                                            example: 'phpartisan',
                                        },
                                    },
                                    required: ['email', 'password'],
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'User logged in successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            user: {
                                                type: 'object',
                                                properties: {
                                                    _id: { type: 'string' },
                                                    username: { type: 'string' },
                                                    email: { type: 'string' },
                                                    role: { type: 'string' },
                                                    createdAt: { type: 'string', format: 'date-time' },
                                                    updatedAt: { type: 'string', format: 'date-time' },
                                                    __v: { type: 'integer' },
                                                },
                                            },
                                            token: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },  
        }
    },
    apis: ['./routes/*.js'], // Path to the API docs
}; // Add missing closing brace

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;