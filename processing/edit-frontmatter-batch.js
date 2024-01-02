const fs = require("fs");
const path = require("path");
const grayMatter = require("gray-matter");
const yaml = require("js-yaml");

// Function to remove specified properties from frontmatter
function removeFrontmatterProperties(frontmatter, propertiesToRemove) {
  for (const property of propertiesToRemove) {
    delete frontmatter[property];
  }
  return frontmatter;
}

// Function to update specified properties in frontmatter
function updateFrontmatterProperties(frontmatter, propertyUpdates) {
  for (const [oldProperty, newProperty] of Object.entries(propertyUpdates)) {
    if (frontmatter[oldProperty] !== undefined) {
      frontmatter[newProperty] = frontmatter[oldProperty];
      delete frontmatter[oldProperty];
    }
  }
  return frontmatter;
}

// Function to process a single Markdown file
function processMarkdownFile(filePath, propertiesToRemove, propertyUpdates) {
  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: body } = grayMatter(content);

  if (data) {
    // Remove specified properties from frontmatter
    let updatedFrontmatter = removeFrontmatterProperties(
      data,
      propertiesToRemove,
    );

    // Update specified properties in frontmatter
    updatedFrontmatter = updateFrontmatterProperties(
      updatedFrontmatter,
      propertyUpdates,
    );

    // Update the content with the modified frontmatter
    const updatedContent = `---\n${yaml.dump(updatedFrontmatter)}---\n${body}`;

    // Save the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, "utf-8");
  } else {
    console.error(`Empty or invalid YAML front matter in file: ${filePath}`);
  }
}

// Function to process all Markdown files in a folder
function processMarkdownFiles(folderPath, propertiesToRemove, propertyUpdates) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    if (file.endsWith(".md")) {
      const filePath = path.join(folderPath, file);
      processMarkdownFile(filePath, propertiesToRemove, propertyUpdates);
      console.log(`Processed: ${file}`);
    }
  }
}

// Specify the folder path, properties to remove, and property updates
const folderPath = path.join(__dirname, "../content/blog"); // Update with your actual path
const propertiesToRemove = [
  "id",
  "uuid",
  "comment_id",
  "locale",
  "codeinjection_head",
  "codeinjection_foot",
  "custom_template",
  "canonical_url",
  "email_recipient_filter",
  "newsletter_id",
  "show_title_and_feature_image",
  "updated_at",
  "published_at",
];

// Update with the properties you want to remove
const propertyUpdates = {
  created_at: "date", // Example: Update 'created_at' to 'date'
  // Add more property updates as needed
};

processMarkdownFiles(folderPath, propertiesToRemove, propertyUpdates);
