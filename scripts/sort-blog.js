import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function renameFiles(folderPath) {
  try {
    // Read all files in the folder
    const files = await fs.readdir(folderPath);

    // Filter for .md files and read their content
    const mdFiles = await Promise.all(
      files
        .filter(file => path.extname(file) === '.md')
        .map(async file => {
          const filePath = path.join(folderPath, file);
          const content = await fs.readFile(filePath, 'utf8');
          const { data } = matter(content);
          return { 
            originalName: file, 
            date: new Date(data.date),
            path: filePath
          };
        })
    );

    // Sort files by date
    mdFiles.sort((a, b) => a.date - b.date);

    // Rename files
    for (let i = 0; i < mdFiles.length; i++) {
      const file = mdFiles[i];
      const newName = `${i + 1}.${file.originalName}`;
      const newPath = path.join(folderPath, newName);
      await fs.rename(file.path, newPath);
      console.log(`Renamed ${file.originalName} to ${newName}`);
    }

    console.log('All files have been renamed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Usage
const folderPath = path.join(__dirname, '../', 'content', 'blog'); // Replace with your folder path
renameFiles(folderPath);