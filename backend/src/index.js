require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const usersRoutes = require("./routes/users");
const middlewareLogRequest = require("./middleware/logs");
const cors = require('cors');

app.use(cors({
  origin: ['https://react-express-og.vercel.app/', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type']
}));

app.use(middlewareLogRequest);
app.use(express.json())

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
