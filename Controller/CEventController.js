import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import CEventModel from "../Models/CEventModel.js"
import mongoose from 'mongoose';
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
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send('No file uploaded');
    }

    const logoevent = files.map(file => ({
      filename: file.filename,
      contentType: file.mimetype,
      size: file.size,
      uploadDate: new Date()
    }));

    // Kiểm tra và chuyển đổi ownerId thành ObjectId
    if (!mongoose.isValidObjectId(profileId)) {
      return res.status(400).send('Invalid owner ID');
    }

    const ownerObjectId = new mongoose.Types.ObjectId(profileId);

    // Tạo mới sự kiện
    const newEvent = await CEventModel.create({
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
      price: price
    });

    res.sendFile(path.join(__dirname, '../public', 'page.html'));
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Internal Server Error');
  }
};

const Renderdata = async (req, res) => {
  const { eventname } = req.body;
  const ejsFilePath = path.join(__dirname, '..', 'renderdata.ejs');
  try {
    const regex = new RegExp(eventname, 'i');
    const findinfor = await CEventModel.find({ eventname: { $regex: regex } })
      .populate('profile', 'fullname')
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

const CEventController = {
  CEvent: CEvent,
  Renderdata: Renderdata,
};

export default CEventController;