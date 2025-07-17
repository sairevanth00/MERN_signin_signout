import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://sairevanth_7373:2gbKNrCRsUoJq3Rp@cluster0.rljvh55.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("MongoDB connected"));

  
export default mongoose;
