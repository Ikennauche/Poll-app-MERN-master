const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required: true,
        unique: true
    },

    pass:{
        required:true,
        type: String
    },
    polls:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Poll'
    }],
    created:{
        type:Date,
        default:Date.now
    }
});

userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('pass')){
            return next();
        }
        const hashed = await bcrypt.hash(this.pass,10);
        this.pass = hashed;
        return next();
    }catch(err){
        return next(err)
    }
});

userSchema.methods.comparePassword = async function(attempt,next){
    try {
        return await bcrypt.compare(attempt,this.pass);
    } catch (error) {
            next(error)
    }
};

module.exports = mongoose.model('User',userSchema);
