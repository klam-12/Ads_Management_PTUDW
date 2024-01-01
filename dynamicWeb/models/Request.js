const mongoose = require('moongose');

const EditRequestSchema = new mongoose.Schema({
  objectToEdit: {
    type: String,
    enum: ['SetPoint', 'Advertisement'],
  },
  objectId: { type: mongoose.Schema.Types.ObjectId, refPath: 'objectToEdit' },
  requestedAt: { type: Date, default: Date.now },
  reason: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  updatedInfo: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
}, { timestamps: true });

const EditRequest = mongoose.model('EditRequest', EditRequestSchema);

export default EditRequest;
