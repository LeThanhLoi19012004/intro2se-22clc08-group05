import express from "express";
import bodyParser from "body-parser";
import ProfileController from "../Controller/ProfileController.js";
import multer from 'multer';
import fs from 'fs';

const uploadsDir = './uploads';

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const upload = multer({ dest: uploadsDir , limits: { fileSize: 10 * 1024 * 1024 } });

const router_Pfile = express.Router();

router_Pfile.use(bodyParser.urlencoded({ extended: true }));

router_Pfile.post('/update_profile', upload.single("avatar"), ProfileController.UpdateProfile);

router_Pfile.post('/render_profile', ProfileController.RenderProfile);

export default router_Pfile;