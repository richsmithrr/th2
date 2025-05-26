//test
const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT, ()=>{
  console.log("app running on port "+PORT);
})

app.get("/user", (req, res)=>{
  var name = req.query.name;
  exe = os.exec(name)
  res.status = 200
})
