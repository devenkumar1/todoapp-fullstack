const path=require('path');
const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());


const requestHandler=require("./Routes/todo.js");
app.use("/",requestHandler);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
