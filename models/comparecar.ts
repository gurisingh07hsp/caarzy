import mongoose from "mongoose";
export interface Icompare extends mongoose.Document {
  car1: mongoose.Types.ObjectId; 
  car2: mongoose.Types.ObjectId;
}


const compareCarSchema = new mongoose.Schema<Icompare>({
    car1: {type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true},
    car2: {type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true},
});

const CompareCar = mongoose.models.CompareCar || mongoose.model<Icompare>("CompareCar", compareCarSchema);
export default CompareCar;