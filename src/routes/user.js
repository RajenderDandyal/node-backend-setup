import express from 'express';
import userController from '../controllers/userController';
import validation from '../middlewares/validations/validation';

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
 * public
 * get user details by its id
 * */
router.get('/details/:id', validation.pathParams, userController.details);
/*
 * path /api/v1/user/update/:id
 * put
 * public
 * update user by its id
 * */
router.put('/update/:id', validation.pathParams, validation.createUser, userController.update);
/*
 * path /api/v1/user/register
 * delete
 * public
 * delete user by its id
 * */
router.delete('/delete/:id', validation.pathParams,  userController.deleteOne);

export default router;
