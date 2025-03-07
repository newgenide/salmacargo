import {model, models, Schema} from 'mongoose'

const ShipmentSchema = new Schema<IShipmentHistory>({
    trackingID:{
        type: String,
        required: true
    },
    currentLocation: String,
    status: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    }
},{
    timestamps: true
})

const ShipmentHistory = models.ShipmentHistory || model('ShipmentHistory', ShipmentSchema);

export default ShipmentHistory;