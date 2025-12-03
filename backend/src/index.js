require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require('cors');
const app = express();
const usersRoutes = require("./routes/users");
const middlewareLogRequest = require("./middleware/logs");

const allowedOrigins = [
  'https://obit-react-express.netlify.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (e.g. curl, mobile apps)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // kalau pakai cookie/credentials
}));

app.options('*', cors()); // tetap ijinkan preflight

app.use(middlewareLogRequest);
app.use(express.json())

app.use((req, res, next) => {
  console.log("middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("middleware 2");
  next();
});

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
