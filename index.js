const express = require("express");
const mongoose=require('./config/mongoose');
const ejs=require('ejs');
const app = express();
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const port = process.env.LOCAL_PORT;//when deployin to server we will change it to 80

console.log('port is ',process.env.LOCAL_PORT);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("./assets"));






//extract style and scripts from subpages into layout


// use express router
app.use("/", require("./routes"));

// setup view engine--ejs
app.engine("ejs",ejsMate);
app.set("view engine", "ejs");
app.set("views", "./views");


app.use(methodOverride("_method"));//_method is query parameter to handle requests

app.use("/", require("./routes"));
app.use((req,res)=>{
  res.send("NOT FOUND");
})
app.listen(port || 8000, async function (err) {
  if (err) {
    return console.log(`Error in running the server: ${err}`);
  }
  // const Experience=require('./models/experience');
  // const exp=new Experience({
  //   username:"blah",
  //   experience:"blah",
  //   company:"blah blah",
  //   year:"2018",
  // });
  // try{
  // const exper=await exp.save();
  // console.log(exper);
  // }
  // catch(err)
  // {
  //   console.log(err);
  // }
  return console.log(`Server fired up on port: ${port}`);
});