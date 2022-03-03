import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Picture = new Schema
({
    ident:
    {
        type : String
    },
    paths :
    {
        type: Array
    }
});

export default mongoose.model('Picture', Picture, 'picture');