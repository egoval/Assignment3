const app = require('./server/config/app'); // Import the app configuration
const PORT = process.env.PORT || 3000; // Set the server port from .env or default to 3000
const mongoose = require('mongoose'); // Import Mongoose for MongoDB connection

let DB = require('./server/config/db'); // Import the mongodb URI

// Connect to MongoDB
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'There is a connection Error'));
mongoDB.once('open',()=>{
  console.log("It's connected with MongoDB")
});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true})

// Start the server
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});