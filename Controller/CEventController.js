import CEventModel from "../Models/CEventModel.js"
import mongoose from 'mongoose';

// Lấy kết nối Mongoose hiện tại
const conn = mongoose.connection;

// Khai báo biến để lưu đối tượng GridFSBucket
let gfs;

// Thiết lập GridFSBucket khi kết nối Mongoose mở thành công
conn.once('open', () => {
  // Khởi tạo đối tượng GridFSBucket với tên bucket 'uploads'
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});


const CEvent = async (req, res) => {
  try {
    const profileId = req.body['owner'];
    const eventname = req.body['event-name'];
    const eventtype = req.body['event-type'];
    const descriptionevent = req.body['description'];
    const rulesevent = req.body['rules'];
    const location = req.body['location'];
    const eventdate = new Date(req.body['event-date']);
    const eventtimeStr = req.body['event-time'];
    const [hourStr, minuteStr] = eventtimeStr.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const type = ["Charity", "Meeting", "Team Building", "Music", "Festival"]
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

    res.json({message: 'Create event sucessfully'});
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Internal Server Error');
  }
};

const Renderdata = async (req, res) => {
  const { eventid } = req.body['eventid'];
  
  try {
    const findinfor = await CEventModel.findOne({ eventID: eventid })
      .exec();
    if (findinfor) {
      return res.status(400).json({success: false, message: 'Wrong event ID'});
    } else {
      const eventsData = findinfor => ({
        ...event.toObject(),
        eventtimeFormatted: formatEventTime(event.eventtime)
      });
      res.status(200).json({sucess: true, data: eventsData});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: 'Server error'});
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

const RenderEvent = async (req, res) => {
  const { event_id } = req.body;
  try {
    const findEvent = await CEventModel.findOne({ eventID: event_id})
      .populate('profile', 'fullname')
      .exec();
    if (findEvent) {
      return res.status(400).json({success: false, message: 'Invalid event id!'});
    } else {
      const eventData = findEvent;
      eventData.eventtimeFormatted = formatEventTime(eventData.eventtime)
      res.json({success: true, data: eventData})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
};

const SearchEvent = async (req, res ) => {
  try {
    const events = await CEventModel.find({}, {
      _id: 1,
      logoevent: 1,
      eventname: 1,
      eventtype: 1,
      location: 1,
      eventdate: 1,
      descriptionevent: 1,
      eventtime: 1
    });
    res.json({success: true, data: events});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
}

const CEventController = {
  CEvent: CEvent,
  Renderdata: Renderdata,
  RenderEvent: RenderEvent,
  SearchEvent: SearchEvent
};

export default CEventController;