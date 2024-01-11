import mongoose from 'mongoose';


const EditRequestSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  objectToEdit: {
    type: String,
    enum: ['SetPoint', 'Advertisement'],
  },
  objectId: { type: mongoose.Schema.Types.ObjectId, refPath: 'objectToEdit' },
  requestedAt: { type: Date, default: Date.now },
  reason: {
    type: String,
   
  },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  updatedInfo: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },

}, { timestamps: true });

const EditRequest = mongoose.model('EditRequest', EditRequestSchema);

export default EditRequest;
