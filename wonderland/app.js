var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var {indexRouter }  = require('./routes/index');

const mongoose = require('mongoose');
//var Rewards = require('./models/rewardSchema');
const MongoClient = require('mongodb').MongoClient





var app = express();
let userReward,ss;

// mailto:mongoose.connect('mongodb+srv://wonderland:wonderland@wonderlandmongo.xvfxz.mongodb.net/test?retryWrites=true&w=majority')
//   .then(() => {
//       console.log('Database connected');
//       //console.log('Database connected', userReward);
//       sendData(userReward);
//       main();
            
//   })
//   .catch((err) => {
//       console.log(err);
//   });

  async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://wonderland:wonderland@wonderlandmongo.xvfxz.mongodb.net/test?retryWrites=true&w=majority";
  
  
    const client = new MongoClient(uri);
  
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        // Make the appropriate DB calls
        await  listDatabases(client);
        await fetchData(client)
        console.log(ss)
        userReward = await processUserStakingLog(10000000, 1646977722, ss);
        console.log(userReward)
        for(let i=0; i<userReward.length;i++){
          var reward = await client.db("test").collection("rewards").insertOne({
        
              id: userReward[i]._id,
              total_gg_reward: userReward[i].total_gg_reward,
              total_balance: userReward[i].total_balance,
              reward_logs: userReward[i].reward_logs
            }
            
            
          )
        //var promise = reward.save()
        console.log("reward", reward)
          }
        
  
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
  }
  async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };

  async function fetchData(client){
    ss = await client.db("test").collection("snapshot").find({}).toArray()
    
    
  }



  let processUserStakingLog = async (reward, timeStamp, snapShot) => {
    userReward = [];
    const parsedSummary = { maxThresholdLog: 0, totalUser: 0, userList: {}};
    snapShot.forEach((snapData, index) => {
        if(new Date(snapShot[index].updatedAt).getUTCHours() != new Date(snapData.updatedAt).getUTCHours()){
            let data = snapData.data;
            data.forEach(obj => {
                if(!parsedSummary.userList[obj.address]){
                    parsedSummary.userList[obj.address] = {
                        address: obj.address,
                        amountStaked: parseFloat(obj.amount),
                        sumOfAllLoggedAmount: parseFloat(obj.amount),
                        totalLogs: 1
                    };
                    parsedSummary.totalUser += 1;
                }
                else{
                    parsedSummary.userList[obj.address]['amountStaked'] = parseFloat(obj.amount);
                    parsedSummary.userList[obj.address]['sumOfAllLoggedAmount'] += parseFloat(obj.amount);
                    parsedSummary.userList[obj.address]['totalLogs'] += 1;
                }
                parsedSummary.maxThresholdLog =
                    parsedSummary.maxThresholdLog < parsedSummary.userList[obj.address]['totalLogs']
                    ? parsedSummary.userList[obj.address]['totalLogs']
                    : parsedSummary.maxThresholdLog;
            });
        }
    });
    const userList = Object.keys(parsedSummary.userList);
    let totalAvgAmount = 0;
    userList.forEach(key => {
        let avg = parsedSummary.userList[key]['sumOfAllLoggedAmount'] / parsedSummary.maxThresholdLog;
        parsedSummary.userList[key]['avgAmount'] = avg;
        totalAvgAmount += avg;
    });
    parsedSummary['totalAvgAmount'] = totalAvgAmount;

    userList.map(key => {
        parsedSummary.userList[key]['gg_reward'] = parseFloat(
            ((parsedSummary.userList[key]['avgAmount'] / totalAvgAmount) * reward).toPrecision(15)
        );
        let foundUser = userReward.find(x => x._id == key);
        if(foundUser){
            let foundDate = false;
            foundUser['total_balance'] = parsedSummary.userList[key]['amountStaked'];
            const start_date = timeStamp;
            const DateString = `${new Date(timeStamp).getUTCFullYear()}-${new Date(timeStamp).getUTCMonth() + 1}`;
            foundUser['reward_logs'].forEach(rwl => {
              if (foundUser.date_stamp == DateString) {
                foundDate = true;
                rwl.total_snapshots += 1;
                rwl.last_updated_at = timeStamp;
                rwl.balance = parsedSummary.userList[key]['amountStaked'];
                rwl.gg_reward += parsedSummary.userList[key]['gg_reward'];
              }
            });
            if (!foundDate) {
              foundUser['reward_logs'].push({
                date_stamp: DateString,
                start_date: start_date,
                last_updated_at: start_date,
                total_snapshots: 1,
                balance: parsedSummary[0].usersList[key]['amountStaked'],
                gg_reward: parsedSummary[0].usersList[key]['gg_reward'],
              });
            }
        }
        else{
            userReward.push({
                _id: key,
                total_gg_reward: 0.0,
                total_balance: parsedSummary.userList[key]['amountStaked'],
                reward_logs: [
                  {
                    date_stamp: `${new Date(timeStamp).getUTCFullYear()}-${new Date(timeStamp).getUTCMonth() + 1}`,
                    start_date: timeStamp,
                    last_updated_at: timeStamp,
                    balance: parsedSummary.userList[key]['amountStaked'],
                    total_snapshots: 1,
                    gg_reward: parsedSummary.userList[key]['gg_reward'],
                  },
                ]
            });
        }
    });
    userReward = userReward.map(user => {
        user.total_gg_reward = user.reward_logs.reduce((prev, curr) => {
            return prev + curr.gg_reward;
        }, 0);
        return user;
    });

    return userReward;
}


main();






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);


module.exports = app;
