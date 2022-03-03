import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Listing = new Schema
({
    description :
    {
        type : String
    },
    city :
    {
        type : String
    },
    municipality :
    {
        type : String
    },
    address :
    {
        type : String
    },
    number :
    {
        type : Number
    },
    type :
    {
        type : String
    },
    numoflevels :
    {
        type : Number
    },
    level :
    {
        type : Number
    },
    size :
    {
        type : Number
    }
    ,
    numofrooms :
    {
        type : Number
    }
    ,
    furnished :
    {
        type : String
    }
    ,
    price :
    {
        type : Number
    }
    ,
    owner :
    {
        type : String
    },
    status :
    {
        type : String
    },
    promoted :
    {
        type : String
    },
    buyer :
    {
        type : String
    },
    wantToBuy :
    {
        type: Array
    },
    paths :
    {
        type: Array
    }
});

export default mongoose.model('Listings', Listing, 'listings');