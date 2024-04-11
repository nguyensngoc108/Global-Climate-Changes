import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const countrySchema = new mongoose.Schema(
    {
        dt:{
            type: Date,
            
        },
        Country: {
            type: String,
        },
        AverageTemperature: {
            type: Number,
        },
        AverageTemperatureUncertainty: {
            type: Number,
        }

    },
    {
        timestamps: true,
        collection: 'countries'
    }
);

export const Country = mongoose.model('Country', countrySchema);
