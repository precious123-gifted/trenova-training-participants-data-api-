import {Schema,model,models} from "mongoose"
import moment from 'moment-timezone';


const UserSchema = new Schema ({

participantName :{
    type : String ,
    required : [true , "company name is required"],
    minLength : [1,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
},

schoolName :{
    type : String ,
    required : [true , "first name is required"],
    minLength : [1,"full name should be atleast 4 letters long"],
    maxLength : [50,"full name should be atmost 30 letters long"],
}
,

address :{
    type : String ,
    required : [true , "last name is required"],
    minLength : [1,"full name should be atleast 4 letters long"],
    maxLength : [100,"full name should be atmost 30 letters long"],
}
,

phoneNumber :{
    type : String ,
    required : [true , "job title is required"],
    minLength : [2,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
}
,


email :{
    type : String ,
    unique : true ,
    required : [true , "email is required"],
    match : [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email address"]
}
,

createdDate: {
    type: Date,
    default: () => new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
  },

 })



const User = models['User'] || model('User', UserSchema, 'trenova-training');

export default User 





