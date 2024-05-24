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
   ]
};

export default options;
