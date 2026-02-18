import { Schema, model } from "mongoose";

const FortressKeySchema = new Schema({
    id: String,
    siteURL: String,
    username: String,
    password: String,
});
export const FortressKey = model('FortressKey', FortressKeySchema);