const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const pdfRoutes = require('./routes/pdfRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, '../uploads');
const outputDir = path.join(__dirname, '../output');

(async () => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
  }
})();

app.use('/uploads', express.static(uploadDir));
app.use('/output', express.static(outputDir));

app.use('/api/pdf', pdfRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PDF Master Pro API is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 PDF Master Pro Server running on port ${PORT}`);
});
