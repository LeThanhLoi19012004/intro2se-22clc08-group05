import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import CEventController from "../Controller/CEventController.js";
import multer from 'multer';
import fs from 'fs';

const uploadsDir = './uploads';

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const upload = multer({ dest: uploadsDir });

const router_ = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router_.use(bodyParser.urlencoded({ extended: true }));
router_.use(express.static(join(__dirname, '../public')));

router_.post('/create_event', upload.single("logoevent"), CEventController.CEvent);
router_.post('/renderdata', CEventController.Renderdata);

router_.post('/followEvent', CEventController.followEvent);
router_.post('/manageEvent', CEventController.ManageEvent);
export default router_;