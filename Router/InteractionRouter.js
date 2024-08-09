import express from "express";
import bodyParser from "body-parser";
import InteractionController from "../Controller/InteractionController.js";

const router_Interaction = express.Router();

router_Interaction.use(bodyParser.urlencoded({ extended: true }));

router_Interaction.post('/comment', InteractionController.commentPost);

router_Interaction.post('/like', InteractionController.likePost);

router_Interaction.post('/get-interaction', InteractionController.getPostInteraction);

export default router_Interaction;