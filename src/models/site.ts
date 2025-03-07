import {model, models, Schema} from 'mongoose'

const SiteSchema = new Schema<Site>({
    siteName: String,
    address: String,
    email: String,
    phone: String
},{
    timestamps: true
});

const Site = models.Site || model('Site', SiteSchema);

export default Site;
