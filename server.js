const express = require("express");
const multer = require('multer');
const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
});

const upload = multer({ storage: fileStorageEngine });
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
// app.post('/single', upload.single('image'), (req, res) => {
//     console.log(req.file);
//     res.send('Single File upload successful')
// });

app.post("/multiple",upload.array('images', 5), (req, res) => {
    try{
        console.log(req.files);
    res.send("Multiple Files Upload successful")
    }
    catch(err){
        console.log(err)
    }
    
});
app.listen(5000);