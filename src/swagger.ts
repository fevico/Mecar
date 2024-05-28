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
                Car:{
                    type: "object",
                    required: ["make", "year", "VIN", "model"],
                    properties:{
                        make:{ 
                            type: "string",
                            format: "name",
                            default: "Toyota",
                            description: "Car's make name"
                        },
                        year:{ 
                            type: "number",
                            format: "name",
                            default: "2020",
                            description: "Car's make year or model"
                        },
                        VIN:{ 
                            type: "string",
                            format: "name",
                            default: "cfvgbhj987655",
                            description: "Car's VIN number"
                        },
                        model:{ 
                            type: "string",
                            format: "name",
                            default: "car model",
                            description: "Car's model"
                        },
                        
                    }
                },
                updateMechanic:{
                    type: "object",
                    required: ["companyImage", "firstName", "lastName", "address", "workshopAddress", "homeAddress", "state", "associationIdCard", "associationIdNumber", "nationality", "businessAddress", "businessName", "bussinessPermit"],
                    properties:{
                        businessAddress:{ 
                            type: "string",
                            format: "name",
                            default: "los agelis califonia",
                            description: "User's business address"
                        },
                        businessName:{ 
                            type: "string",
                            format: "name",
                            default: "sunny mech",
                            description: "User's business name"
                        },
                        bussinessPermit:{ 
                            type: "string",
                            format: "name",
                            default: "sunny mech",
                            description: "User's business permit"
                        },
                        associationIdNumber:{ 
                            type: "number",
                            format: "name",
                            default: "3456789",
                            description: "User's association id number"
                        },
                        nationality:{ 
                            type: "string",
                            format: "name",
                            default: "Nigeria",
                            description: "User's nationality"
                        },
                        associationIdCard:{ 
                            type: "string",
                            format: "name",
                            default: "Nigeria",
                            description: "User's association Id Card"
                        },
                        companyImage:{ 
                            type: "string",
                            format: "name",
                            default: "Image 1",
                            description: "User's association company image"
                        },
                        state:{ 
                            type: "string",
                            format: "name",
                            default: "Image 1",
                            description: "User's company image"
                        },
                        homeAddress:{ 
                            type: "string",
                            format: "name",
                            default: "No 11 surulere",
                            description: "User's home address"
                        },
                        workshopAddress:{ 
                            type: "string",
                            format: "name",
                            default: "No 15 ojuelegbga",
                            description: "User's work shop address"
                        },
                        address:{ 
                            type: "string",
                            format: "name",
                            default: "No 15 ojuelegbga",
                            description: "User's address"
                        },
                    }
                },
                Category:{
                    type: "object",
                    required: ["name", "image"],
                    properties:{
                        name:{ 
                            type: "string",
                            format: "name",
                            default: "Car Maintanace",
                            description: "Category name"
                        },
                        image:{ 
                            type: "number",
                            format: "name",
                            default: "image url",
                            description: "Category image url"
                        },
                        
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
        "./src/routes/car.ts",
        "./src/routes/category.ts",
   ]
};

export default options;
