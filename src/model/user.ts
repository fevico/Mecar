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
    tokens:string[];
    role: "mechanic" | "carOwner" | "admin",
    mechanicDetails:{
        businessName: string;
        businessAddress: string;
        associationIdNumber: number
        workshopAddress: string;
        nationality: string;
        state: string;
        homeAddress: string;
        companyImage: string;
        associationIdCard: string;
        bussinessPermit: string;
    }
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
    tokens: [ String],
    role: {type: String, enum: ['mechanic', 'carOwner', 'admin'], required: true, default: 'carOwner'},
    mechanicDetails:{
        businessName: String,
        businessAddress: String,
        associationIdNumber: Number,
        workshopAddress: String,
        nationality: String,
        state: String,
        homeAddress: String,
        companyImage: String,
        associationIdCard: String,
        bussinessPermit: String,
    }
    
}, {timestamps: true})

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

const userModel = model("User", userSchema);
export default userModel;