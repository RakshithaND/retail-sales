// backend/src/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const salesRoutes = require('./routes/sales');
const servicesRoutes = require('./routes/services');
const intakeRoutes = require('./routes/intake');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/sales', salesRoutes);
app.use('/services', servicesRoutes);
app.use('/intake', intakeRoutes);
app.use("/nexus", require("./routes/nexus"));
app.use('/intake', require('./routes/intake'));





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
