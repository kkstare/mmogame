import Global from "../Global";

Global.collection("cdk").insertOne({
    "itemId": [1, 2],
    "itemNum": [100, 1000],
    "startTime": Date.now(),
    "endTime": Date.now(),
    "key": "vip666"
})