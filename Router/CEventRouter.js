import express from "express";
import bodyParser from "body-parser";
import CEventController from "../Controller/CEventController.js";
import multer from 'multer';
import fs from 'fs';

const uploadsDir = './uploads';

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const upload = multer({ dest: uploadsDir });

const router_ = express.Router();

router_.use(bodyParser.urlencoded({ extended: true }));

router_.post('/create_event', upload.array("logoevent", 1), CEventController.CEvent);

router_.post('/renderdata', CEventController.Renderdata);

router_.post('/renderevent', CEventController.RenderEvent);

export default router_;