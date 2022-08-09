var express = require('express');
var bodyParser=require('body-parser')
var router = express.Router();

router.use(express.json(extended=true))
// works witth x-www-form-encoded
// works with default options in axios
router.use(bodyParser.urlencoded({
   extended: true
 }));
// router.use(express.urlencoded())

router.get("/validate",(req,res)=>{
    res.send("Working")
})




module.exports = router;