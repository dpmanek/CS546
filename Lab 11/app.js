const express=require('express')
const app=express();
const path = require('path');
const port =3000;

const static = express.static(__dirname + "/public");
app.use("/public", static);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/static/index.html'));
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})