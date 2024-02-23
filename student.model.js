const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let person = new Schema({
    person_name: { type: String },
    person_place: { type: String },
    person_mail: { type: String },
});
module.exports = mongoose.model("Student", person);
