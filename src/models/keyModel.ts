import { Schema } from 'mongoose';
import workerDB from '../services/db'; 
import  IKey  from '../interfaces/key'; 

const keySchema = new Schema<IKey>({
   rollNo: {
      type: String,
      required: true,
      unique: true,
   },
   publicKey: {
      type: String,
      required: true,
   },
});

const Key = workerDB.model<IKey>('Key', keySchema);
export default Key;
