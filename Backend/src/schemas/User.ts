import { Schema, model, Document } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export interface UserInterface extends Document {
  avatar?: string;
  userId?: number | null;
  name: string;
  username: string;
  email: string;
  password: string;
  genres?: [string];
  generateToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema({
  avatar: {
    type: String,
    default: 'https://api.adorable.io/avatars/100/2@adorable.png'
  },
  userId: {
    type: Number
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: (personalEmail: string): boolean => {
        return new RegExp('^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$').test(personalEmail)
      },
      message: 'Invalid email'
    },
    required: true
  },
  password: {
    type: String,
    required: true
  },
  genres: {
    type: [String]
  }
})

UserSchema.pre<UserInterface>('save', async function (next) {
  if (this.password) {
    const hashPassword = await hash(this.password, 10)
    this.password = hashPassword
    next()
  }
})

UserSchema.methods.generateToken = function (): string {
  const secret: string = process.env.SECRET ? process.env.SECRET : ''
  return sign({ id: this.id }, secret, {
    expiresIn: 86400
  })
}

UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return compare(password, this.password)
}

export default model<UserInterface>('User', UserSchema)
