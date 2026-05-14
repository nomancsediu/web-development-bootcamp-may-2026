import express from 'express';
import { getAllUsers, getAUser, loginUser, myProfile, verifyUser, updateName } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.get("/me", isAuth, myProfile);
router.get("/user/all", isAuth,getAllUsers);
router.get("/user/:id", getAUser);
router.put("/user/update/:id", isAuth, updateName);


export default router;