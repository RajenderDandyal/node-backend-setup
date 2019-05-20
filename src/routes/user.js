import express from "express";

let router = express.Router();

/*
* path /api/v1/user/test
* public
* testing user route
* */
router.get('/test', (req,res)=>{
  res.send('user route')
})

export default router;