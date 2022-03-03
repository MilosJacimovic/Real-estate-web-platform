import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema
({
    name :
    {
        type : String
    },
    surname :
    {
        type : String
    },
    username :
    {
        type : String
    },
    password :
    {
        type : String
    },
    mail :
    {
        type : String
    },
    city :
    {
        type : String
    },
    country :
    {
        type : String
    },
    type :
    {
        type : String
    },
    status :
    {
        type : String
    },
    image :
    {
        type : String
    }
});

export default mongoose.model('User', User, 'users');