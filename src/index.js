import { connect } from 'mongoose';
import app from './app.js';
import { PORT, MONGO_URI } from './constants.js';


// Connect to MongoDB
connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });