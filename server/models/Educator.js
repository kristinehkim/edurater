const { Schema, model } = require('mongoose');
const educatorSchema = new Schema({
    ratedEducator: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }, 
    rating: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            review: {
                type: String,
                required: 'You need to leave a rating!',
                minlength: 1,
                maxlength: 280,
                trim: true,
            },
        }
    ], 
    thumbsDown: [
        {
        }
    ]
   
}
)
const Educator = model('Educator', educatorSchema);

module.exports = Educator;