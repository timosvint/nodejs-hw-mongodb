import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "wrong email"],
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },


}, { timestamps: true });

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

 const User = model('User', userSchema);

export default User;
