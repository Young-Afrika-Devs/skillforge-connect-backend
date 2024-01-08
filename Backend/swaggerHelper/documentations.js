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
            "/api/user/create-class": {
                post: {
                    tags: ['Class'],
                    description: 'Create a new class',
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
                                        className: {
                                            type: 'string',
                                            example: 'C Programming',
                                        },
                                        description: {
                                            type: 'string',
                                            example: 'Memory Management deep dive',
                                        },
                                        instructor: {
                                            type: 'string',
                                            example: 'Mr. Kaplan',
                                        },
                                        capacity: {
                                            type: 'integer',
                                            example: 1254,
                                        },
                                    },
                                    required: ['className', 'description', 'instructor', 'capacity'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Class created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Class created successfully',
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    className: { type: 'string' },
                                                    description: { type: 'string' },
                                                    instructor: { type: 'string' },
                                                    capacity: { type: 'integer' },
                                                    enrolledStudents: { type: 'array', items: { type: 'string' } },
                                                    _id: { type: 'string' },
                                                    createdAt: { type: 'string', format: 'date-time' },
                                                    updatedAt: { type: 'string', format: 'date-time' },
                                                    __v: { type: 'integer' },
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
            "/api/user/get-classes": {
                get: {
                    tags: ['Class'],
                    description: 'Get all classes',
                    responses: {
                        '200': {
                            description: 'Classes fetched successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            data: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        _id: { type: 'string' },
                                                        className: { type: 'string' },
                                                        description: { type: 'string' },
                                                        instructor: { type: 'string' },
                                                        capacity: { type: 'integer' },
                                                        enrolledStudents: { type: 'array', items: { type: 'string' } },
                                                        createdAt: { type: 'string', format: 'date-time' },
                                                        updatedAt: { type: 'string', format: 'date-time' },
                                                        __v: { type: 'integer' },
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
            },
            "/api/user/enroll-in-class": {
                post: {
                    tags: ['Class'],
                    description: 'Enroll in a class',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        userId: {
                                            type: 'string',
                                            example: '657ed25208cc8dea2da8d994',
                                        },
                                        classId: {
                                            type: 'string',
                                            example: '657ee68abd17a55ffb715f66',
                                        },
                                    },
                                    required: ['userId', 'classId'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Enrolled successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Enrolled successfully',
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    _id: { type: 'string' },
                                                    className: { type: 'string' },
                                                    description: { type: 'string' },
                                                    instructor: { type: 'string' },
                                                    capacity: { type: 'integer' },
                                                    enrolledStudents: { type: 'array', items: { type: 'string' } },
                                                    createdAt: { type: 'string', format: 'date-time' },
                                                    updatedAt: { type: 'string', format: 'date-time' },
                                                    __v: { type: 'integer' },
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
            "/api/user/delete-class": {
                delete: {
                    tags: ['Class'],
                    description: 'Delete a class',
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
                                        classId: {
                                            type: 'string',
                                            example: '657edee127c5dbed00573307',
                                        },
                                    },
                                    required: ['classId'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Class deleted successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Class deleted successfully',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/user/update-class": {
                put: {
                    tags: ['Class'],
                    description: 'Update a class',
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
                                        classId: {
                                            type: 'string',
                                            example: '657edfb227c5dbed0057330a',
                                        },
                                        instructor: {
                                            type: 'string',
                                            example: 'Luke SkywalkeR',
                                        },
                                        capacity: {
                                            type: 'integer',
                                            example: 112,
                                        },
                                    },
                                    required: ['classId'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Class updated successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Class updated successfully',
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    _id: { type: 'string' },
                                                    className: { type: 'string' },
                                                    description: { type: 'string' },
                                                    instructor: { type: 'string' },
                                                    capacity: { type: 'integer' },
                                                    enrolledStudents: { type: 'array', items: { type: 'string' } },
                                                    createdAt: { type: 'string', format: 'date-time' },
                                                    updatedAt: { type: 'string', format: 'date-time' },
                                                    __v: { type: 'integer' },
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
            "/api/user/get-class/{classId}": {
                get: {
                    tags: ['Class'],
                    description: 'Get a specific class by ID',
                    parameters: [
                        {
                            name: 'classId',
                            in: 'path',
                            description: 'ID of the class to get',
                            required: true,
                            schema: {
                                type: 'string',
                                example: '657edfb227c5dbed0057330a',
                            },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Class fetched successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    _id: { type: 'string' },
                                                    className: { type: 'string' },
                                                    description: { type: 'string' },
                                                    instructor: { type: 'string' },
                                                    capacity: { type: 'integer' },
                                                    enrolledStudents: { type: 'array', items: { type: 'string' } },
                                                    createdAt: { type: 'string', format: 'date-time' },
                                                    updatedAt: { type: 'string', format: 'date-time' },
                                                    __v: { type: 'integer' },
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
            "/api/user/create-event": {
                post: {
                    tags: ['Event'],
                    description: 'Create a new event',
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
                                        eventName: {
                                            type: 'string',
                                            example: 'API Testing with Postman',
                                        },
                                        description: {
                                            type: 'string',
                                            example: 'Learning Postman in-depth',
                                        },
                                        location: {
                                            type: 'string',
                                            example: 'Live on Zoom',
                                        },
                                        date: {
                                            type: 'string',
                                            format: 'date',
                                            example: '01/01/2024',
                                        },
                                        capacity: {
                                            type: 'integer',
                                            example: 2152,
                                        },
                                    },
                                    required: ['eventName', 'description', 'location', 'date', 'capacity'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Event created successfully',
                        },
                        '400': {
                            description: 'Duplicate event error',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'E11000 duplicate key error collection: test.events index: eventName_1 dup key: { eventName: "API Testing with Postman" }',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/user/get-events": {
                get: {
                    tags: ['Event'],
                    description: 'Get all events',
                    responses: {
                        '200': {
                            description: 'Events fetched successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            events: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        _id: { type: 'string' },
                                                        eventName: { type: 'string' },
                                                        description: { type: 'string' },
                                                        location: { type: 'string' },
                                                        date: { type: 'string', format: 'date-time' },
                                                        capacity: { type: 'integer' },
                                                        enrolledStudents: { type: 'array', items: { type: 'string' } },
                                                        createdAt: { type: 'string', format: 'date-time' },
                                                        updatedAt: { type: 'string', format: 'date-time' },
                                                        __v: { type: 'integer' },
                                                    },
                                                },
                                            },
                                            pagination: {
                                                type: 'object',
                                                properties: {
                                                    currentPage: { type: 'integer' },
                                                    totalPages: { type: 'integer' },
                                                    totalItems: { type: 'integer' },
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
            "/api/user/enroll-in-event": {
                post: {
                    tags: ['Event'],
                    description: 'Enroll in an event',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        eventId: {
                                            type: 'string',
                                            example: '659873aec3c1b279bf90bc56',
                                        },
                                        userId: {
                                            type: 'string',
                                            example: '657ed25208cc8dea2da8d994',
                                        },
                                    },
                                    required: ['eventId', 'userId'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Enrolled in event successfully',
                        },
                        '400': {
                            description: 'Already enrolled in event',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'You are already enrolled in this event',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/user/update-event/{eventId}": {
                put: {
                    tags: ['Event'],
                    description: 'Update an event',
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            name: 'eventId',
                            in: 'path',
                            description: 'ID of the event to update',
                            required: true,
                            schema: {
                                type: 'string',
                                example: '659950ea618be48ca3aab1ef',
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        updateFields: {
                                            type: 'object',
                                            properties: {
                                                capacity: {
                                                    type: 'integer',
                                                    example: 1424,
                                                },
                                            },
                                        },
                                    },
                                    required: ['updateFields'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Event updated successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Event updated successfully',
                                            },
                                            event: {
                                                type: 'object',
                                                properties: {
                                                    _id: { type: 'string' },
                                                    eventName: { type: 'string' },
                                                    description: { type: 'string' },
                                                    location: { type: 'string' },
                                                    date: { type: 'string', format: 'date-time' },
                                                    capacity: { type: 'integer' },
                                                    enrolledStudents: { type: 'array', items: { type: 'string' } },
                                                    createdAt: { type: 'string', format: 'date-time' },
                                                    updatedAt: { type: 'string', format: 'date-time' },
                                                    __v: { type: 'integer' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'Event not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Event not found',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/user/delete-event": {
                delete: {
                    tags: ['Event'],
                    description: 'Delete an event',
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
                                        eventId: {
                                            type: 'string',
                                            example: '659ac88ea5ca12257b94dc24',
                                        },
                                    },
                                    required: ['eventId'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Event deleted successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Event deleted successfully',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'Event not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Event not found',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/user/get-event/{eventId}": {
                get: {
                    tags: ['Event'],
                    description: 'Get an event by ID',
                    parameters: [
                        {
                            name: 'eventId',
                            in: 'path',
                            description: 'ID of the event to get',
                            required: true,
                            schema: {
                                type: 'string',
                                example: '659873aec3c1b279bf90bc56',
                            },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Event retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            _id: { type: 'string' },
                                            eventName: { type: 'string' },
                                            description: { type: 'string' },
                                            location: { type: 'string' },
                                            date: { type: 'string' },
                                            capacity: { type: 'integer' },
                                            enrolledStudents: { type: 'array', items: { type: 'string' } },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            updatedAt: { type: 'string', format: 'date-time' },
                                            __v: { type: 'integer' },
                                        },
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'Event not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Event not found',
                                            },
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