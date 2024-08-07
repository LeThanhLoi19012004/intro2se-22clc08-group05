import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import PostController from "../Controller/PostController.js";
import multer from 'multer';
import fs from 'fs';

const uploadsDir = './uploads';

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const upload = multer({ dest: uploadsDir });
const router_Post = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router_Post.use(bodyParser.urlencoded({ extended: true }));
router_Post.use(express.static(join(__dirname, '../public')));

router_Post.post('/submit-post', upload.array('images', 4), PostController.UpPost);

router_Post.post('/renderpost', PostController.RenderPost);


export default router_Post;