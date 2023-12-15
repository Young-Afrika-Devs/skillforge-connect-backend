// utils/db.js
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://mrkaplan77:phpartisan@cluster0.uwlfh9p.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

export default db;

