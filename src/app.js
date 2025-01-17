require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    // Sync all models that aren't already in the database
    sequelize.sync().then(() => {
      console.log('Database synced');
      // Only start listening on the port if the database sync succeeds
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }).catch(syncErr => {
      console.error('Error syncing database:', syncErr);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
