const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Swagger Documentation For Mecar App",
            version: "1.0.0",
            description: "API for managing Mecar",
        },
        servers:[
            {
                url: "http://localhost:4000/",
                description: "Local server",
            }
        ],
        components:{
            schemas:{
                Users:{
                    type: "object",
                    required: ["firstName", "lastName", "email", "password", "phoneNumber"],
                    properties:{
                        firstName:{ 
                            type: "string",
                            format: "name",
                            default: "John",
                            description: "User's first name"
                        },
                        lastName:{ 
                            type: "string",
                            format: "name",
                            default: "John",
                            description: "User's last name"
                        },
                        email:{ 
                            type: "string",
                            format: "email",
                            default: "example@example.com",
                            description: "User's email address"
                        },
                        password:{
                            type: "string",
                            format: "password",
                            description: "User's password",
                            default: "examplePassword"
                        },
                        phoneNumber:{
                            type: "string",
                            format: "mobile",
                            description: "User's phone number",
                            default: "45234567890"
                        }
                    }
                },
            },
            responses:{
                200:{
                    description: "Success",
                    content: "application/json"
                },
                400:{
                    description: "Bad Request",
                    content: "application/json"
                },
                404:{
                    description: "Request Not Found",
                    content: "application/json"
                },
                403:{
                    description: "Unauthorized Request",
                    content: "application/json"
                },
                422:{
                    description: "Unprocessed Request user already exists",
                    content: "application/json"
                },
                500:{
                    description: "Internal Server Error",
                    content: "application/json"
                }
            },
            securitySchemes: {
                ApiKeyAuth:{
                    type: "apikey",
                    in: "header",
                    name: "Authorization",
                }
            }
        },
        security:[{
            ApiKeyAuth:[],
        }]
    },
    apis:[ 
        "./src/routes/auth.ts",
   ]
};

export default options;
