import express from 'express';
import userController from '../controllers/userController';
import validation from '../middlewares/validations/validation';
import auth from "../middlewares/auth";

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
router.post('/register', validation.createUser, userController.createUser);
/*
 * path /api/v1/user/list
 * get
 * public
 * list all users or pagination
 * */
router.get('/list', validation.skipLimit, userController.list);
/*
 * path /api/v1/user/details/:id
 * get
 * protected
 * get user details by its id
 * */
router.get('/details/:id', auth.userAuth, validation.pathParams, userController.details);
/*
 * path /api/v1/user/update/:id
 * put
 * protected
 * update user by its id
 * */
router.put('/update/:id', auth.userAuth, validation.pathParams, validation.createUser, userController.update);
/*
 * path /api/v1/user/register
 * delete
 * protected
 * delete user by its id
 * */
router.delete('/delete/:id', auth.userAuth, validation.pathParams, userController.deleteOne);
/*
 * path /api/v1/user/auth/:id
 * auth
 * public
 * get auth token
 * */
router.get('/auth/:id', userController.auth);

export default router;
