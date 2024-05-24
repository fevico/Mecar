import { compare, genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";

interface mechanicDocument extends Document{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phoneNumber: number;
    verified: boolean;
    address: string;
    tokens:string[]
    role: string
}

interface methods{
    comparePassword(password: string): Promise<boolean>
}

const mechanicSchema = new Schema<mechanicDocument, {}, methods>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    verified:{
        type: Boolean,
        default: false
    },
    address:{
        type: String,
    },
    tokens: [String],

    role:{
        type: String,
        default: "mechanic"
    }
})

mechanicSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await genSalt(10)
        this.password = await hash(this.password, salt)
    }
    next()
})
mechanicSchema.methods.comparePassword = async function(password){
  return  await compare(password, this.password)
}

const mechanicModel = model("Mechanic", mechanicSchema);
export default mechanicModel;