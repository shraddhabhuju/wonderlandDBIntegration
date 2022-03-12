var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var {userReward,indexRouter }  = require('./routes/index');

const mongoose = require('mongoose');
var Rewards = require('./models/rewardSchema');





var app = express();
//let userReward = [{"_id":"hx52a5f71f8f6323adf618362e647f645e786b9b9d","total_gg_reward":4302561.7544691,"total_balance":1800882,"omm_balance":0,"reward_logs":[{"date_stamp":"1970-1","start_date":1646977722,"last_updated_at":1646977722,"balance":1800882,"total_snapshots":1,"gg_reward":4302561.7544691}]}]

  
//let userReward = processUserStakingLog(10000000, 1646977722, ss);

mongoose.connect('mongodb+srv://wonderland:wonderland@wonderlandmongo.xvfxz.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
      console.log('Database connected');
      console.log('Database connected', userReward);
      sendData(userReward);

      
  })
  .catch((err) => {
      console.log(err);
  });

 
//console.log(userReward[0]);




async function sendData(userReward){

    for(let i=0; i<userReward.length;i++){
        var reward = await Rewards.create({
      
            id: userReward[i]._id,
            total_gg_reward: userReward[i].total_gg_reward,
            total_balance: userReward[i].total_balance,
            omm_balance: userReward[i].omm_balance,
            reward_logs: userReward[i].reward_logs
          }
          
          
        )
      //var promise = reward.save()
      console.log("reward", reward)
      //console.log("promise", promise)

    }
 


}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


module.exports = app;
