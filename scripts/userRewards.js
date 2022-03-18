
const MongoClient = require('mongodb').MongoClient





let userReward;
const uri = "mongodb+srv://wonderland:wonderland@wonderlandmongo.xvfxz.mongodb.net/test?retryWrites=true&w=majority";
  
  
    const client = new MongoClient(uri);

  async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    
  
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        // Make the appropriate DB calls
        await  listDatabases(client);
        let ss = await fetchData(client, "snapshot");
        // 1647739371
        //March 23 = 1647995877674
        // April 3 = 1648995877674
        //March 25 = 1648171371000
        userReward = await processUserStakingLog(50,1653441771099, ss, client);

        for(let i=0; i<userReward.length;i++){
            const _id = { _id: userReward[i]._id }
            const options = { upsert: true };
          var reward = await client.db("validator-data").collection("rewards").updateOne(_id,{
            $set: {
              _id: userReward[i]._id,
              total_crown_reward: userReward[i].total_crown_reward,
              total_balance: userReward[i].total_balance,
              reward_logs: userReward[i].reward_logs
            }
        }, options
            
            
          )
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

  async function fetchData(client,dbName){
    dbData = await client.db("validator-data").collection(dbName).find({}).toArray()
    return dbData;
  }



  let processUserStakingLog = async (reward, timeStamp, snapShot, client) => {

    userReward = await fetchData(client, "rewards");
    const parsedSummary = { maxThresholdLog: 0, totalUser: 0, userList: {}};
    snapShot = [snapShot[snapShot.length - 1]];
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
        parsedSummary.userList[key]['crown_reward'] = parseFloat(
            ((parsedSummary.userList[key]['avgAmount'] / totalAvgAmount) * reward).toPrecision(15)
        );
        let foundUser = userReward.find(x => x._id == key);
        if(foundUser){
            let foundDate = false;
            foundUser['total_balance'] = parsedSummary.userList[key]['amountStaked'];
            const start_date = timeStamp;
            const DateString = `${new Date(timeStamp).getUTCFullYear()}-${new Date(timeStamp).getUTCMonth() + 1}`;
            foundUser['reward_logs'].forEach(rwl => {
              if (rwl.date_stamp == DateString) {
                foundDate = true;
                rwl.total_snapshots += 1;
                rwl.last_updated_at = timeStamp;
                rwl.balance = parsedSummary.userList[key]['amountStaked'];
                rwl.crown_reward += parsedSummary.userList[key]['crown_reward'];
              }

            });
            if (!foundDate) {
              foundUser['reward_logs'].push({
                date_stamp: DateString,
                start_date: start_date,
                last_updated_at: start_date,
                total_snapshots: 1,
                balance: parsedSummary.userList[key]['amountStaked'],
                crown_reward: parsedSummary.userList[key]['crown_reward'],
              });
            }
        }
        else{
            userReward.push({
                _id: key,
                total_crown_reward: 0.0,
                total_balance: parsedSummary.userList[key]['amountStaked'],
                reward_logs: [
                  {
                    date_stamp: `${new Date(timeStamp).getUTCFullYear()}-${new Date(timeStamp).getUTCMonth() + 1}`,
                    start_date: timeStamp,
                    last_updated_at: timeStamp,
                    balance: parsedSummary.userList[key]['amountStaked'],
                    total_snapshots: 1,
                    crown_reward: parsedSummary.userList[key]['crown_reward'],
                  },
                ]
            });
        }
    });
    userReward = userReward.map(user => {
        user.total_crown_reward = user.reward_logs.reduce((prev, curr) => {
            return prev + curr.crown_reward;
        }, 0);
        return user;
    });

    return userReward;
}


main();
