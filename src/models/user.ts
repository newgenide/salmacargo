import { IUser } from "@/types/models";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User = models.User || model('User', UserSchema);

export default User;