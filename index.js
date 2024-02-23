const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose= require("mongoose");

const app = new express();
app.use(cors());
app.use(bodyParser.json());

let Person=require('./student.model');



mongoose.connect("mongodb+srv://ardraap4321:MZnRrUUXL5Ww1eI3@cluster0.b65b3vw.mongodb.net/studentbase?retryWrites=true&w=majority&appName=Cluster0   ");
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("mongodb connection established")
})

app.get("/", (req, res) => {
  console.log("request");
  res.json("hello world");
});

app.get("/hii", (req, res) => {
  console.log("hii request recieved");
  res.json("helloooo");
});

app.get("/people", async(req, res) => {
  console.log("people request recieved");
 
  res.json([
  { name: "ardra", role: "student" },
    { name: "aparna", role: "student" },
 ]);
});

app.get("/students", async(req, res) => {
  console.log("people request recieved");
  let data=await Person.find().catch(err=>{
    res.json("error loading data");
  });
  res.json(data);

//   res.json([
//     { name: "ardra", age: "20", department: "cs" },
//     { name: "aparna", age: "20", department: "cs" },
//   ]);
});

    app.get('/person/:id',async(req,res) =>{
        let id=req.params.id;
        let data =await Person.findById(id).catch(err =>{
            res.json("error finding student");
        });
        if(!data){
            res.json("not found");
        }else{
            res.json(data);
        }

        
    })

    app.delete('/person/:id',async(req,res) =>{
        let id=req.params.id;
        await Person.findByIdAndDelete(id)
        .then(() =>{
            res.json('data removed successfully');
        })
        .catch(() =>{
            res.json("failed deleting data");
        })
        
    }) 



app.post("/person", (req, res) => {
  console.log(req.body);
  let person = new Person(req.body);
  person.save().then(()=>{
    res.json("saved successfully");
  }).catch(err=>{
    res.json("error"+err);
  })
});

app.listen("4000", () => {
  console.log("started server on 4000");
});
