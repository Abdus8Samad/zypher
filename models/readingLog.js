const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const readingLogSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    event_type:{
        type:String,
        required:false
    },
    book:{
        type:Schema.Types.ObjectId,
        ref:'Book',
        required:true
    },
    timeStamp:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

const ReadingLog = mongoose.model('ReadingLog',readingLogSchema);

module.exports = ReadingLog;