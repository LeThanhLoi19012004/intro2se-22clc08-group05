import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join  } from "path";
import AccountController from "../Controller/AccountController.js";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(join(__dirname, '../public')));

router.post('/sign-in', AccountController.PostSignin);

router.post('/sign-up', AccountController.PostSignup);

router.post('/forgot-password', AccountController.PostForget_Pass);

router.post('/deleteAccount', AccountController.DeleteAccount);

export default router;