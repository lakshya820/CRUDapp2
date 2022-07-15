const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root' ,
    host:'localhost' ,
    password:'password' ,
    database: 'spotify-clone' ,
})

app.post('/create', (req, res) => {
    const name=req.body.name;
    const artist=req.body.artist;
    const dor=req.body.dor;

    db.query(
        "insert into songs(name,artist,dor) values(?,?,?)",
         [name,artist,dor], 
         (err,result ) => {
            if(err){
                console.log(err)
            } else{
                res.send("Values inserted")
            }
         }
         );

});

app.get("/songs", (req, res) => {
    db.query("SELECT * FROM songs", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  app.put("/update", (req, res) => {
    const id = req.body.id;
    db.query("UPDATE songs SET artist = ? WHERE id = ?",
      [artist, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM songs WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3000, ()=> {
    console.log("Hey your server is running on server 3000");
});