require('dotenv').config();
const express   =  require('express');
const mongoose  =  require('mongoose');
const cors      =  require('cors');
const router = require("./routes/routes");


const app = express();
const port = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("uploads"));
app.use("/api/post",router);

// database connection
mongoose.connect(process.env.DB_URI) 
.then(() => console.log("Connected to the database"))
.catch((err) => console.log(err));

// listen to server
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
});