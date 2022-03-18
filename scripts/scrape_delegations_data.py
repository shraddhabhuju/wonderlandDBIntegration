import json
import requests
from datetime import datetime
from pymongo import MongoClient

import urllib.parse

username = urllib.parse.quote_plus('wonderland')
password = urllib.parse.quote_plus('wonderland')
client = MongoClient(
    "mongodb+srv://wonderland:wonderland@wonderlandmongo.xvfxz.mongodb.net/validator-data?retryWrites=true&w=majority")
db = client["validator-data"]
collection = db["snapshot"]

json_data = {}
res = requests.get("https://api.stake.hmny.io/networks/mainnet/validators/one1zdz826ruk0rfp78vg3dw98epwn33ky3cu9udmm")
data = res.json()
delegation_list = (data["delegations"])
list_delegator = []
createdAt = {}
updatedAt = {}
sum = 0
for items in delegation_list:
    dict1 = {}
    address = items["delegator-address"]
    amount = items["amount"]
    if amount != 0:
        dict1["address"] = address
        dict1["amount"] = '{:f}'.format(amount)
        sum += amount
        list_delegator.append(dict1)
import datetime

json_data["data"] = list_delegator
time = datetime.datetime.now()
json_data["createdAt"] = { "$date": str(time)}
json_data["updatedAt"] = { "$date": str(time)}
collection.insert_one(json_data)