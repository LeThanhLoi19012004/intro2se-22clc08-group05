import express from "express";
import connectDatabase  from './Services/ConnectDBService.js';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from "path";
import { dirname, join } from 'path';
import router_ from "./Router/CEventRouter.js";
import router from "./Router/AccountRouter.js"; 
import router_Pfile from "./Router/ProfileRouter.js"; 
import router_OTicket from "./Router/OrderTicketRouter.js"; 
import router_Post from "./Router/PostRouter.js"
import router_Interac from "./Router/InteractionRouter.js";

connectDatabase()
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.use('/', router_);
app.use('/', router_Pfile);
app.use('/', router_OTicket);
app.use('/', router_Post);
app.use('/', router_Interac);
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Listening on port 3000");
  });