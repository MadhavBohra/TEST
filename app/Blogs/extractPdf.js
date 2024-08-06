const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfDirectory = './public/BlogsPDFS';
const outputJson = './public/blogs.json';

const extractTextAndImages = async (pdfBuffer) => {
  const data = await pdf(pdfBuffer);
  // Extract text
  const text = data.text;
  // Extract images (this requires more work, check the `pdf-parse` documentation or use another library)
  const images = []; // Dummy array, replace with actual image extraction
  return { text, images };
};

const convertPdfsToJson = async () => {
  const files = fs.readdirSync(pdfDirectory);
  const blogs = [];

  for (const file of files) {
    if (path.extname(file) === '.pdf') {
      const filePath = path.join(pdfDirectory, file);
      const pdfBuffer = fs.readFileSync(filePath);
      const { text, images } = await extractTextAndImages(pdfBuffer);

      const blog = {
        id: blogs.length + 1,
        title: path.basename(file, '.pdf'),
        content: text,
        images
      };
      blogs.push(blog);
    }
  }

  fs.writeFileSync(outputJson, JSON.stringify(blogs, null, 2));
  console.log(`Converted ${blogs.length} PDFs to JSON`);
};

convertPdfsToJson();
