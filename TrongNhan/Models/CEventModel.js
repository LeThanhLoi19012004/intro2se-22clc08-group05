import mongoose from "mongoose";

// Định nghĩa Schema cho logo sự kiện
const logoeventSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  size: Number,
  uploadDate: Date
});

// Định nghĩa Schema cho thời gian sự kiện
const Start_Time = new mongoose.Schema({
  hour: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  minute: {
    type: Number,
    required: true,
    min: 0,
    max: 59,
  },
  amPm: {
    type: String,
    required: true,
    enum: ['AM', 'PM'],
  },
});

// Định nghĩa Schema cho sự kiện
const CEventSchema = new mongoose.Schema({
  eventID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfoCEvent',
  },
  profile: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfoProfile',
    required: true 
  },
  logoevent: { type: [logoeventSchema] }, 
  eventname: { type: String, required: true },
  eventtype: { type: String, required: true },
  descriptionevent: { type: String },
  rulesevent: { type: String, required: true },
  location: { type: String, required: true },
  eventcreationdate: { type: Date, default: Date.now },
  eventdate: { type: Date, required: true, index: true },
  eventtime: { type: Start_Time, required: true },
  numberoftickets: { type: Number, required: true },
  ticketavailable : { type: Number, required: true },
  tickettype: { type: String, required: true },
  price: { type: Number, required: true },
});

// Middleware trước khi lưu
CEventSchema.pre('save', function(next) {
  if (!this.eventcreationdate) {
    this.eventcreationdate = new Date();
  }
  next();
});

// Tạo và xuất khẩu model
const CEventModel = mongoose.model('InfoCEvent', CEventSchema);

export default CEventModel;