import { defineMongooseModel } from '#nuxt/mongoose';
import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  stripeCustomerId?: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export const User = defineMongooseModel<IUserDocument>({
  name: 'User',
  schema: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },
  },
  options: {
    timestamps: true,
  },
  hooks(schema) {
    schema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();
      this.password = await generateHash(this.password);
    });

    schema.methods.comparePassword = async function (
      candidatePassword: string,
    ) {
      return await comparePassword(candidatePassword, this.password);
    };
  },
});
