const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://akhtar-admin:pulsar150@atlascluster.ux104bi.mongodb.net/placementStats",{ useNewUrlParser: true })

const dbSchema=new mongoose.Schema({
    Name: String,
    Branch: String,
    Ctc: Number,
    numberOfOpenings: Number,
    totalHired: Number,
    jobTitle: String,
    Location: String,
    Email: String
});
const details= mongoose.model("details",dbSchema);
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    // res.send("Haa");
})
app.get("/adminForm",(req,res)=>{
    // console.log(__dirname);
    res.sendFile("/adminForm.html", {root: __dirname });
})
app.get("/user",(req,res)=>{
    res.sendFile("/user.html", {root: __dirname });
})
// app.get("/detailsFromDoc",(req,res)=>{
//     res.sendFile("/detailsFromDoc.html", {root: __dirname });
// })
app.get("/index.ejs",(req,res)=>{
    details.find({},function(err,detailss){
        res.render("index",{detailedList: detailss});
    })
})
app.post("/",(req,res)=>{
    // var todayy = new Date();
    // var dd = String(todayy.getDate()).padStart(2, '0');
    // var mm = String(todayy.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = todayy.getFullYear();
    // todayy = mm + '/' + dd + '/' + yyyy;
    const newDetails=new details({
        Name: req.body.name,
        Branch: req.body.branch,
        Ctc: req.body.ctc,
        numberOfOpenings: req.body.numOfOpenings,
        totalHired: req.body.totalHired,
        jobTitle: req.body.job,
        Location: req.body.loc,
        Email: req.body.email
    })
    newDetails.save();
    res.redirect("/");
})
app.post("/search",(req,res)=>{
    details.find({Usn:req.body.usn},function(err,detailss){
        res.render("index",{detailedList: detailss});
    })
})
app.post("/search2",(req,res)=>{ 
   const tem=req.body.date;
   console.log(tem);
    details.find({ '$where': 'this.RegDate.toJSON().slice(0, 10) == "tem"' },function(err,detailss){
        console.log("Found");
        res.render("teacherView",{detailedList: detailss});
    })
})
app.listen(3000,function(){
    console.log("Server started at port 3000.");
})