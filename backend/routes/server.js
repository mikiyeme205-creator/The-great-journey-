const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/auth', authRoutes);          // ✅ Admin login
app.use('/orders', ordersRoutes);      // ✅ Customer orders
app.use('/admin', adminRoutes);        // ✅ Admin dashboard

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
