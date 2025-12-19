import mongoose from "mongoose";
export interface IModel extends mongoose.Document {
  brand: string;
  modelName: string;
  bodyType: 'suv' | 'hatchback' | 'sedan' | 'coupe' | 'convertible' | 'wagon' | 'muv' | 'luxury' | 'pickup truck';
  category: 'Popular Cars' | 'Electric Cars' | 'Upcoming Cars' | 'Latest Cars' | 'Other';
  images: string[];
  variant: mongoose.Types.ObjectId[]; 
  description: string;
  colors: string[];
  pros: string[];
  cons: string[];
  isFeatured: boolean;
  isLatest: boolean;
  launchDate: Date;
}

const modelSchema = new mongoose.Schema<IModel>({
    brand: {type: String, required: true, trim: true},
    modelName: {type: String, required: true, trim: true},
    bodyType: {type: String, required: true, enum: ['suv','hatchback','sedan','coupe','convertible','wagon','muv','luxury','pickup truck']},
    category: {type: String, required: true, enum: ['Popular Cars','Electric Cars','Upcoming Cars','Latest Cars','Other']},
    images: {type: [String], required: true},
    variant: [{type: mongoose.Schema.Types.ObjectId, ref: 'Car'}],
    description: {type: String},
    colors: {type: [String]},
    pros: {type: [String]},
    cons: {type: [String]},
    isFeatured: {type: Boolean},
    isLatest: {type: Boolean},
    launchDate: {type: Date}
});

const Model = mongoose.models.Model || mongoose.model<IModel>("Model", modelSchema);
export default Model;