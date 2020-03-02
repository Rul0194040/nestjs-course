import { Document } from 'mongoose';

export interface User extends Document {
  id: number,
  email: string,
  roles: Array<string>,
  passwordHash: string
}