import { Document } from 'mongoose';

export class User extends Document {
  userId: string;
  name: string;
  email: string;
  age: number;
}
