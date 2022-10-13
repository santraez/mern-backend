const app = require('./config/server');
const initDB = require('./config/db');
const userRoutes = require('./routes/user');

initDB();

app.get('/', (req, res) => res.status(200).send('API IS WORKING'));

app.use('/api', userRoutes);