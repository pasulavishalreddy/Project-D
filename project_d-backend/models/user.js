import mongoose from "mongoose"
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

 addresses: [
      {
        label: {
          type: String,
          required: true,
        },

        fullName: {
          type: String,
          required: true,
        },

        phone: {
          type: String,
          required: true,
        },

        addressLine: {
          type: String,
          required: true,
        },

        city: {
          type: String,
          required: true,
        },

        state: {
          type: String,
          required: true,
        },

        pincode: {
          type: String,
          required: true,
        },

        country: {
          type: String,
          required: true,
        },

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    isAdmin:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps:true
})

const User = mongoose.model("User", userschema)
export default User;


