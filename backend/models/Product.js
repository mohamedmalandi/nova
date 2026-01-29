import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['item', 'service'],
    },
    category: {
        type: String,
        required: true,
        enum: ['keys', 'skins', 'wild-pass', 'coaching', 'boosting'],
    },
    options: {
        type: Map,
        of: [String],
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String, // URL to the image
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
