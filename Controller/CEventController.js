import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import CEventModel from "../Models/CEventModel.js";
import mongoose from 'mongoose';
import fs from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

const CEvent = async (req, res) => {
  try {
    const profileId = req.body['owner'];
    const eventname = req.body['eventname'];
    const eventtype = req.body['eventtype'];
    const descriptionevent = req.body['descriptionevent'];
    const rulesevent = req.body['rulesevent'];
    const location = req.body['location'];
    const eventdate = new Date(req.body['eventdate']);
    const eventtimeStr = req.body['eventtime'];
    const status = req.body['status']; //add
    const [hourStr, minuteStr] = eventtimeStr.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    // Xử lý AM/PM
    let amPm = '';
    if (hour >= 12) {
      amPm = 'PM';
      if (hour > 12) {
        hour -= 12;
      }
    } else {
      amPm = 'AM';
      if (hour === 0) {
        hour = 12;
      }
    }

    const eventtime = {
      hour: hour,
      minute: minute,
      amPm: amPm
    };

    const numberoftickets = parseInt(req.body['numberoftickets'], 10);
    const tickettype = req.body['tickettype'];
    const price = parseInt(req.body['price'], 10);

    const file = req.file; // lấy file từ multer
    const imageBase64 = fs.readFileSync(file.path, 'base64');

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    const logoevent = {
      filename: file.filename,
      contentType: file.mimetype,
      size: file.size,
      uploadDate: new Date(),
      imageBase64: imageBase64
    };

    // Kiểm tra và chuyển đổi ownerId thành ObjectId
    if (!mongoose.isValidObjectId(profileId)) {
      return res.status(400).send('Invalid owner ID');
    }

    const ownerObjectId = new mongoose.Types.ObjectId(profileId);

    // Tạo mới sự kiện
    const newEvent = new CEventModel({
      profile: ownerObjectId,
      logoevent: logoevent,
      eventname: eventname,
      eventtype: eventtype,
      descriptionevent: descriptionevent,
      rulesevent: rulesevent,
      location: location,
      eventdate: eventdate,
      eventtime: eventtime,
      numberoftickets: numberoftickets,
      ticketavailable: numberoftickets,
      tickettype: tickettype,
      price: price,
      status: status, //add
    });
    await newEvent.save();

    newEvent.eventID = newEvent._id;
    await newEvent.save();

    res.sendFile(path.join(__dirname, '../public', 'page.html'));
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Internal Server Error');
  }
};

const Renderdata = async (req, res) => {
  const { eventid } = req.body['eventid'];
  const ejsFilePath = path.join(__dirname, '..', 'renderdata.ejs');
  try {
    //const regex = new RegExp(eventid_, 'i');
    const findinfor = await CEventModel.find({ eventID: eventid })
      .populate('profile', 'fullname')
      .populate('logoevent')
      .exec();

    if (findinfor.length === 0) {
      return res.status(400).send('No event with that name');
    } else {
      const eventsData = findinfor.map(event => ({
        ...event.toObject(),
        eventtimeFormatted: formatEventTime(event.eventtime)
      }));

      const html = await ejs.renderFile(ejsFilePath, { events: eventsData });
      res.send(html);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Hàm định dạng thời gian sự kiện
function formatEventTime(eventtime) {
  const hour = eventtime.hour;
  const minute = eventtime.minute;
  const amPm = eventtime.amPm;

  let formattedHour = hour < 10 ? `0${hour}` : hour;
  let formattedMinute = minute < 10 ? `0${minute}` : minute;

  return `${formattedHour}:${formattedMinute} ${amPm}`;
}

//add
const followEvent = async (req, res) => {
  try {
    const eventID = req.body['eventID'];
    const profileID = req.body['profileID'];

    if (!mongoose.isValidObjectId(eventID) || !mongoose.isValidObjectId(profileID)) {
      return res.status(400).send('Invalid event ID or profile ID');
    }

    const event = await CEventModel.findById(eventID);

    if (!event) {
      return res.status(404).send('Event not found');
    }

    const index = event.follows.indexOf(profileID);

    if (index === -1) {
      event.follows.push(profileID);
    } else {
      event.follows.splice(index, 1);
    }

    await event.save();

    res.status(200).send('Follow status updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const ManageEvent = async (req, res) => {
  try { 
    const { eventID, eventname, eventtype, status, descriptionevent, rulesevent, location, eventdate, eventtime, price } = req.body;

    // Kiểm tra xem eventID có hợp lệ không
    if (!mongoose.isValidObjectId(eventID)) {
      return res.status(400).send('Invalid eventID');
    }

    // Tìm sự kiện theo eventID
    const event = await CEventModel.findById(eventID);
    if (!event) {
      return res.status(404).send('Event not found');
    }

    // Cập nhật thông tin sự kiện
    if (eventname) event.eventname = eventname;
    if (eventtype) event.eventtype = eventtype;
    if (status) event.status = status;
    if (descriptionevent) event.descriptionevent = descriptionevent;
    if (rulesevent) event.rulesevent = rulesevent;
    if (location) event.location = location;
    if (eventdate) event.eventdate = new Date(eventdate);
    if (eventtime) {
      const [hour, minute] = eventtime.split(':');
      event.eventtime.hour = parseInt(hour);
      event.eventtime.minute = parseInt(minute);
      event.eventtime.amPm = hour >= 12 ? 'PM' : 'AM';
    }
    if (price !== undefined) event.price = price;

    // Lưu sự kiện đã chỉnh sửa
    await event.save();

    res.status(200).send('Event updated successfully');
  } catch (error) {
    console.error('Error managing event:', error);
    res.status(500).send('Server error');
  }
};

const CEventController = {
  CEvent: CEvent,
  Renderdata: Renderdata,
  followEvent: followEvent,
  ManageEvent: ManageEvent,
};

export default CEventController;