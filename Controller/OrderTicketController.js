import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import orderTIcketModel from "../Models/OrderTicketModel.js"
import CEventModel from "../Models/CEventModel.js";
import mongoose from "mongoose";
const __dirname = dirname(fileURLToPath(import.meta.url));

const OTicket = async (req, res) => {
  try {
    const { profileID, eventID, ticketorder } = req.body;


    const profileObjectId = new mongoose.Types.ObjectId(profileID);
    const eventObjectId = new mongoose.Types.ObjectId(eventID);


    const newOrder = new orderTIcketModel({
      profileID: profileObjectId,
      eventID: eventObjectId,
      ticketorder: ticketorder
    });

    await newOrder.save();

    console.log('Order created successfully');


    const event = await CEventModel.findById(eventObjectId);
    if (event) {
      event.ticketavailable -= ticketorder;
      await event.save();
      console.log('Event updated successfully');
    } else {
      console.error('Event not found');
      return res.status(404).send('Event not found');
    }

    // Render trang thành công với EJS
    const ejsFilePath = path.join(__dirname, '..', 'renderOrder.ejs');
    const html = await ejs.renderFile(ejsFilePath, { order: newOrder });
    res.send(html);

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Internal Server Error');
  }
};

const ProfileController = {
  OTicket: OTicket
};

export default ProfileController;