import mongoose from "../config/DBHelpler"
import dayjs from "dayjs"

const Schema = mongoose.Schema

const LinksSchema = new Schema({
    title: { type: String, default: '' },
    link: { type: String, default: '' },
    type: { type: String, default: 'link' },
    created: { type: Date, default: '' },
    isTop: { type: String, default: '' },
    sort: { type: String, default: '' },
})

LinksSchema.pre('save', function(next) {
    this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
    next()
})

// LinksSchema.statics

const LinksMOdel = mongoose.model('links', LinksSchema)


export default LinksMOdel


