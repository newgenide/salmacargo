import {model, models, Schema} from 'mongoose'

const PackageSchema = new Schema<IPackage>({
    trackingID:{
        type: String,
        required: true
    },
    senderName: {
        String,
        required: true
    },
    senderEmail: String,
    senderPhone: String,
    originAddress: String,
    receiverName: {
        String,
        required: true
    },
    receiverEmail: String,
    receiverPhone: String,
    destinationAddress: String,
    expectedDeliveryDate: Date,
    weight: String,
    freight: String,
    description: String,
    charges: Number,
    status: String
},{
    timestamps: true
})

const Package = models.Package || model('Package', PackageSchema);

export default Package;