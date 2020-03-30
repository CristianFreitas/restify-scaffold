const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        task: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'complete', 'in progress', 'overdue'],
            default: 'pending',
        },
    },
    { minimize: false },
);
ContactSchema.plugin(timestamps);
ContactSchema.plugin(mongooseStringQuery);
const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;