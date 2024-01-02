const fs = require("fs");
const path = require("path");
const grayMatter = require("gray-matter");

// Function to remove specified properties from frontmatter
function removeFrontmatterProperties(frontmatter, propertiesToRemove) {
  for (const property of propertiesToRemove) {
    delete frontmatter[property];
  }
  return frontmatter;
}

// Function to process a single Markdown file
function processMarkdownFile(filePath, propertiesToRemove) {
  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: body } = grayMatter(content);

  if (data) {
    // Remove specified properties from frontmatter
    const updatedFrontmatter = removeFrontmatterProperties(
      data,
      propertiesToRemove,
    );

    // Update the content with the modified frontmatter
    const updatedContent = `---\n${grayMatter.stringify(
      updatedFrontmatter,
    )}---\n${body}`;

    // Save the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, "utf-8");
  } else {
    console.error(`Empty or invalid YAML front matter in file: ${filePath}`);
  }
}

// Function to process all Markdown files in a folder
function processMarkdownFiles(folderPath, propertiesToRemove) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    if (file.endsWith(".md")) {
      const filePath = path.join(folderPath, file);
      processMarkdownFile(filePath, propertiesToRemove);
      console.log(`Processed: ${file}`);
    }
  }
}

// Specify the folder path and properties to remove
const folderPath = path.join(__dirname, "../content/blog"); // Update with your actual path
const propertiesToRemove = ["lexical"]; // Update with the properties you want to remove

processMarkdownFiles(folderPath, propertiesToRemove);
