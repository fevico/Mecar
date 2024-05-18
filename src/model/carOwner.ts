import { compare, genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";

interface userDocument extends Document{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phoneNumber: number;
    verified: boolean;
    address: string;
    tokens:string[]
    role: "admin" | "car_owner" | "mechanic"
}

interface methods{
    comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<userDocument, {}, methods>({
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
        default: "car_owner"
    }
})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await genSalt(10)
        this.password = await hash(this.password, salt)
    }
    next()
})
userSchema.methods.comparePassword = async function(password){
  return  await compare(password, this.password)
}

const userModel = model("user", userSchema);
export default userModel;