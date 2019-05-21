import express from 'express';
import userController from "../controllers/userController";

let router = express.Router();

/*
 * path /api/v1/user/test
 * public
 * testing user route
 * */
router.get('/test', userController.createUser);

export default router;
