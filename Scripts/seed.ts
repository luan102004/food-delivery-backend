import 'dotenv/config';
import { connect, model, Schema } from 'mongoose';

async function seed() {
  await connect(process.env.MONGODB_URI!);
  const UserSchema = new Schema({
    email: { type: String, unique: true },
    name: String,
    role: String,
    createdAt: Date,
  });
  const User = model('User', UserSchema);
  const admin = await User.findOne({ email: 'admin@example.com' }).exec();
  if (!admin) {
    await User.create({ email: 'admin@example.com', name: 'Admin', role: 'admin', createdAt: new Date() });
    console.log('Admin created: admin@example.com');
  } else {
    console.log('Admin exists');
  }
  process.exit(0);
}
seed();
