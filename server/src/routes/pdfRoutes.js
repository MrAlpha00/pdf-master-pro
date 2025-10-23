const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib');

const router = express.Router();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    await fs.mkdir(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

router.post('/merge', upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length < 2) {
      return res.status(400).json({ error: 'At least 2 PDF files required' });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = await fs.readFile(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const outputPath = path.join(__dirname, '../../output', `merged-${Date.now()}.pdf`);
    await fs.writeFile(outputPath, mergedPdfBytes);

    for (const file of files) {
      await fs.unlink(file.path).catch(() => {});
    }

    res.json({ 
      success: true, 
      file: path.basename(outputPath),
      url: `/output/${path.basename(outputPath)}`
    });
  } catch (error) {
    console.error('Merge error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/split', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const { pageRanges } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'PDF file required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();

    const ranges = pageRanges ? JSON.parse(pageRanges) : [[1, totalPages]];
    const outputFiles = [];

    for (let i = 0; i < ranges.length; i++) {
      const [start, end] = ranges[i];
      const newPdf = await PDFDocument.create();
      
      for (let pageNum = start - 1; pageNum < end && pageNum < totalPages; pageNum++) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum]);
        newPdf.addPage(copiedPage);
      }

      const newPdfBytes = await newPdf.save();
      const outputPath = path.join(__dirname, '../../output', `split-${i + 1}-${Date.now()}.pdf`);
      await fs.writeFile(outputPath, newPdfBytes);
      outputFiles.push({
        file: path.basename(outputPath),
        url: `/output/${path.basename(outputPath)}`
      });
    }

    await fs.unlink(file.path).catch(() => {});

    res.json({ success: true, files: outputFiles });
  } catch (error) {
    console.error('Split error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/rotate', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const { rotation, pages } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'PDF file required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageIndices = pages ? JSON.parse(pages) : pdfDoc.getPageIndices();
    const degrees = parseInt(rotation) || 90;

    pageIndices.forEach(index => {
      const page = pdfDoc.getPage(index);
      const currentRotation = page.getRotation().angle;
      page.setRotation({ angle: (currentRotation + degrees) % 360 });
    });

    const rotatedPdfBytes = await pdfDoc.save();
    const outputPath = path.join(__dirname, '../../output', `rotated-${Date.now()}.pdf`);
    await fs.writeFile(outputPath, rotatedPdfBytes);

    await fs.unlink(file.path).catch(() => {});

    res.json({ 
      success: true, 
      file: path.basename(outputPath),
      url: `/output/${path.basename(outputPath)}`
    });
  } catch (error) {
    console.error('Rotate error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/compress', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'PDF file required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const compressedPdfBytes = await pdfDoc.save({ 
      useObjectStreams: false,
      addDefaultPage: false
    });
    
    const outputPath = path.join(__dirname, '../../output', `compressed-${Date.now()}.pdf`);
    await fs.writeFile(outputPath, compressedPdfBytes);

    await fs.unlink(file.path).catch(() => {});

    const originalSize = pdfBytes.length;
    const compressedSize = compressedPdfBytes.length;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    res.json({ 
      success: true, 
      file: path.basename(outputPath),
      url: `/output/${path.basename(outputPath)}`,
      originalSize,
      compressedSize,
      reduction: `${reduction}%`
    });
  } catch (error) {
    console.error('Compress error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/images-to-pdf', upload.array('images', 20), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'At least 1 image file required' });
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const imageBytes = await fs.readFile(file.path);
      let image;

      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (file.mimetype === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        continue;
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = path.join(__dirname, '../../output', `images-${Date.now()}.pdf`);
    await fs.writeFile(outputPath, pdfBytes);

    for (const file of files) {
      await fs.unlink(file.path).catch(() => {});
    }

    res.json({ 
      success: true, 
      file: path.basename(outputPath),
      url: `/output/${path.basename(outputPath)}`
    });
  } catch (error) {
    console.error('Images to PDF error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/protect', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const { password } = req.body;

    if (!file || !password) {
      return res.status(400).json({ error: 'PDF file and password required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const protectedPdfBytes = await pdfDoc.save({
      userPassword: password,
      ownerPassword: password + '_owner'
    });
    
    const outputPath = path.join(__dirname, '../../output', `protected-${Date.now()}.pdf`);
    await fs.writeFile(outputPath, protectedPdfBytes);

    await fs.unlink(file.path).catch(() => {});

    res.json({ 
      success: true, 
      file: path.basename(outputPath),
      url: `/output/${path.basename(outputPath)}`
    });
  } catch (error) {
    console.error('Protect error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
