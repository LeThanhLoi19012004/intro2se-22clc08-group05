import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import InteractionController from "../Controller/InteractionController.js";

const router_Interaction = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router_Interaction.use(bodyParser.urlencoded({ extended: true }));
router_Interaction.use(express.static(join(__dirname, '../public')));

router_Interaction.post('/CommentInteraction', InteractionController.saveComment);
router_Interaction.post('/LikeInteraction', InteractionController.saveLike)
router_Interaction.post('/render_interaction', InteractionController.getPostInteraction);

export default router_Interaction;