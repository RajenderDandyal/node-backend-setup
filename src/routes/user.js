import express from 'express';
import userController from '../controllers/userController';
import userValidation from '../middlewares/validations/userValidation';

let router = express.Router();

/*
 * path /api/v1/user/test
 * get
 * public
 * testing user route
 * */
router.get('/test', userController.test);

/*
 * path /api/v1/user/test
 * post
 * public
 * testing user route
 * */
router.post('/test', userController.test);
/*
 * path /api/v1/user/register
 * post
 * public
 * register new user
 * */
router.post('/register', userValidation.createUser, userController.createUser);

export default router;
