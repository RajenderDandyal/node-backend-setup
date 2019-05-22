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
router.get('/list', validation.skipLimit, userController.list);
router.get('/details/:id', validation.pathParams, userController.details);
router.put('/update/:id', validation.pathParams, validation.createUser, userController.update);

export default router;
