import { ObjectId, Schema, model } from "mongoose"

interface Walletdocument{
    userId: ObjectId
    name: string,
    balance: number,
    currency: string,
    transactions: string[]
}

const walletSchema = new Schema<Walletdocument>({
    userId:{type: Schema.Types.ObjectId, ref: 'User'},
    name: {type: String},
    balance: {type: Number, default: 0},
    currency: {type: String, default: 'NGN'},
    transactions: {type: [String]}
}, {timestamps: true})

const walletModel = model('Wallet', walletSchema)
export default walletModel