import express from "express";
import cors from 'cors'; // Thêm import cors
import connectDatabase from './Services/ConnectDBService.js';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from "path";
import { dirname, join } from 'path';
import router_ from "./Router/CEventRouter.js";
import router from "./Router/AccountRouter.js"; 
import router_Pfile from "./Router/ProfileRouter.js"; 
import router_OTicket from "./Router/OrderTicketRouter.js"; 
import router_Post from "./Router/PostRouter.js";
import router_Interac from "./Router/InteractionRouter.js";

connectDatabase();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Cấu hình CORS
app.use(cors({
  origin: 'http://192.168.1.180:5173', // Địa chỉ của trang Vite trên iPad
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Cho phép cookie và các thông tin xác thực khác
}));


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
const HOST = 'localhost'; // Lắng nghe trên localhost

app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});
