import mongoose from 'mongoose'

const certificalSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        slug: {type: String, required:true, unique:true},
        category: {type: String, required:true},
        image: {type: String},
        description: {type: String, required:true},
        contact:{type: String, required:true},
        date: {type: String, required:true},
        
       
       
    },
    {
        timestamps: true,
    }
);

const Certifical = mongoose.models.Certifical || mongoose.model('Certifical',certificalSchema);
export default Certifical;