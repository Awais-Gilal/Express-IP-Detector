const express = require('express');
const fs = require('fs');
const momentTimezone = require('moment-timezone');

const port = 8000;
const app = express();

function getCurrentTimeInPakistan() {
  const currentTime = momentTimezone.tz('Asia/Karachi');
  const formattedTime = currentTime.format('hh:mm A | DD-MM-YYYY');
  return formattedTime;
}
function readJson() {
    let data;
    try{
        data = fs.readFileSync("data.json",'utf8');
        try {
            data = JSON.parse(data);
        } catch (e) {
            data = [];
        }
    }
    catch (e){
       fs.writeFileSync('data.json',"[]");
       data = [];
    }
    return data;
}
function getIp(req){
    let ip = req.connection.remoteAddress || req.headers['x-forwarded-for'];
    ip = ip.split(":");
    let ipv4 = ip.pop();
    let ipv6 = ip.join(":");
    return [ipv4, ipv6];
}
function setNo(data){
    data = data.reverse();
    let no = data[0].No + 1;
    return no;
}
app.use((req, res, next) => {
    let data = readJson();
    const ip = getIp(req);
    let myData = {
        "No":Object.keys(data).length +1,
        "Method": req.method,
        "Time":getCurrentTimeInPakistan(),
        "IPv4":ip[0],
        "IPv6":ip[1]
    };
    data.push(myData);
    fs.writeFileSync("data.json", JSON.stringify(data));
    next();
})

app.get("/", (req, res)=>{
    let data = readJson();
    data.reverse();
    res.send(data);

})
app.post("/post", (req,res)=>{
    res.send(200);
})

app.listen(port, ()=>{
    console.log("server is listening at: http://localhost:8000/");
})
