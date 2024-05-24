import { compare, genSalt, hash } from "bcrypt";
import { ObjectId, Schema, model } from "mongoose";

interface ForgetPasswordTokenDocument extends Document{
  owner: ObjectId;
  token: string;
  ownerType: 'CarOwner' | 'Mechanic';
  createdAt: Date;
}

interface methods{
    compareToken(token: string): Promise<boolean>
}

const tokenSchema = new Schema<ForgetPasswordTokenDocument, {}, methods>({
  owner: { type: Schema.Types.ObjectId,
    refPath: 'ownerType'
},
ownerType: {
    type: String,
    enum: ['CarOwner', 'Mechanic']
},
token:{
    type: String,
}, 
createdAt:{
    type: Date,
    expires: 3600,
    default: Date.now,
}
},{timestamps: true});

tokenSchema.pre('save', async function(next){
    if(this.isModified('token')){
        const salt = await genSalt(10)
        this.token = await hash(this.token, salt)
    }
    next()
})
tokenSchema.methods.compareToken = async function(token){
  return  await compare(token, this.token)
}

const ForgetPasswordTokenModel = model("PasswordResetToken", tokenSchema);
export default ForgetPasswordTokenModel;
