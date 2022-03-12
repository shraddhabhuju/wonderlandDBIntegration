// Filename: models/userSchema.js

// Import mongoose package for creating schema
const mongoose = require('mongoose');

// Defining schema for our database
const rewardLogsSchema = mongoose.Schema({
    date_stamp:{
        type: Date
    },
    start_date:{
        type: Number
    },
    last_updated_at:
    {
        type: Number
    },
    balance:{
        type:Number
    },
    total_snapshots:{
        type: Number
    },
    gg_reward:{
        type: Number, 
    }

});
const rewardsschema = mongoose.Schema(
  {
    id: {
        type: String,
        required: true
    },
    
    total_gg_reward: {
        type: Number
    },
    total_balance: {
        type: Number

    },
    omm_balance: {
        type: Number
    },
    reward_logs: {
        type:  [rewardLogsSchema]
     }
  },
);


module.exports = mongoose.model('Rewards', rewardsschema);
//module.exports = mongoose.model('rewardslog', rewardLogsSchema);