import express from "express";
import bodyParser from "body-parser";
import OTicketController from "../Controller/OrderTicketController.js";

const router_OTicket = express.Router();

router_OTicket.use(bodyParser.urlencoded({ extended: true }));

router_OTicket.post('/order-ticket', OTicketController.OTicket);

export default router_OTicket;