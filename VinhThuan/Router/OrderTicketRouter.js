import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import OTicketController from "../Controller/OrderTicketController.js";

const router_OTicket = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router_OTicket.use(bodyParser.urlencoded({ extended: true }));
router_OTicket.use(express.static(join(__dirname, '../public')));

router_OTicket.post('/order-ticket', OTicketController.OTicket);

export default router_OTicket;