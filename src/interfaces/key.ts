import { Document } from 'mongoose';

interface IKey extends Document {
    rollNo: string;
    publicKey: string; 
}

export default IKey;

