import express from 'express';
const router = express.Router();
import *as UserController from '../app/controllers/UsersController.js';
import AuthMiddleware from "../app/middlewares/authMiddleware.js";

import {DeleteSingleUser} from "../app/controllers/UsersController.js";


///users

router.post("/Registration",UserController.Registration);
router.post("/Login",UserController.Login);
router.get("/ProfileRead",AuthMiddleware,UserController.ReadSingleProfile);
router.get("/AllUserProfileRead",UserController.AllUserProfileRead);
router.post("/ProfileUpdate",AuthMiddleware,UserController.ProfileUpdate);
router.post("/DeleteSingleUser",AuthMiddleware,UserController.DeleteSingleUser);




export default router;