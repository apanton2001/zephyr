import mongoose from 'mongoose';
import crypto from 'crypto';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee'],
      default: 'employee',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  
  // In a real implementation, use bcrypt here
  // For now, using a simple hash for demonstration
  this.password = crypto
    .createHash('sha256')
    .update(this.password)
    .digest('hex');
  
  next();
});

// Match password method
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  // In a real implementation, use bcrypt.compare here
  // For now, using a simple hash for demonstration
  const hashedPassword = crypto
    .createHash('sha256')
    .update(enteredPassword)
    .digest('hex');
    
  return hashedPassword === this.password;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;