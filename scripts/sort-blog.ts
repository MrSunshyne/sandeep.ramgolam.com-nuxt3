import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MarkdownFile {
  originalName: string;
  date: Date;
  path: string;
}

async function renameFiles(folderPath: string): Promise<void> {
  try {
    // Read all files in the folder
    const files: string[] = await fs.readdir(folderPath);

    // Filter for .md files and read their content
    const mdFiles: MarkdownFile[] = await Promise.all(
      files
        .filter((file) => path.extname(file) === ".md")
        .map(async (file): Promise<MarkdownFile> => {
          const filePath: string = path.join(folderPath, file);
          const content: string = await fs.readFile(filePath, "utf8");
          const { data } = matter(content);
          return {
            originalName: file,
            date: new Date(data.date as string),
            path: filePath,
          };
        }),
    );

    // Sort files by date
    mdFiles.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Rename files
    for (let i = 0; i < mdFiles.length; i++) {
      const file = mdFiles[i];
      const newName: string = `${i + 1}.${file.originalName}`;
      const newPath: string = path.join(folderPath, newName);
      await fs.rename(file.path, newPath);
      console.log(`Renamed ${file.originalName} to ${newName}`);
    }

    console.log("All files have been renamed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Usage
const folderPath: string = path.join(__dirname, "../", "content", "blog"); // Replace with your folder path
renameFiles(folderPath);
