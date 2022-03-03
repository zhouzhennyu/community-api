import mongoose from '../config/DBHelpler'
import dayjs from 'dayjs'

const Schema = mongoose.Schema

const SignRecordSchema = new Schema({
    uid: { type: String, ref: 'users' },
    favs: { type: Number },
    created: { type: Date },
    lastSign: { type: Date }
})

SignRecordSchema.pre('save', function(next) {
    this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
    next()
})

SignRecordSchema.statics = {
    findByUid: function(uid) {
        return this.findOne({uid: uid}).sort({ created: -1})
    }
}

const SignRecordModel = mongoose.model('sign_record', SignRecordSchema)

export default SignRecordModel