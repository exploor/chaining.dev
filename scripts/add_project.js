// @auto-inject-projects
const fs = require('fs');
const path = require('path');

const projectDataPath = process.argv[2];
if (!projectDataPath) {
  console.error('Usage: node add_project.js <path-to-project.json>');
  process.exit(1);
}

const absolutePath = path.resolve(projectDataPath);
console.log(`Reading project data from: ${absolutePath}`);

let rawData = fs.readFileSync(absolutePath, 'utf8');
// Strip BOM if present
if (rawData.charCodeAt(0) === 0xFEFF) {
  rawData = rawData.slice(1);
}
console.log(`Raw data length: ${rawData.length}`);

if (rawData.length === 0) {
  console.error('Error: Project data file is empty');
  process.exit(1);
}

let newProject;
try {
  newProject = JSON.parse(rawData);
} catch (e) {
  console.error('Error parsing project data JSON:', e);
  console.log('First 100 characters of raw data:', rawData.substring(0, 100));
  process.exit(1);
}

// Read current projects.js
const projectsPath = path.join(__dirname, '../data/projects.js');
let content = fs.readFileSync(projectsPath, 'utf8');

// Look for the injection marker
const marker = '// @auto-inject-projects';
if (!content.includes(marker)) {
  console.error('projects.js must contain "// @auto-inject-projects" marker');
  process.exit(1);
}

// Extract existing projects using a safer regex
const arrayMatch = content.match(/export const projects = (\[[\s\S]*?\]);/);
if (!arrayMatch) {
  console.error('Could not find projects array in projects.js');
  process.exit(1);
}

let projects;
try {
  projects = eval(arrayMatch[1]);
} catch (e) {
  console.error('Failed to parse projects array using eval:', e);
  process.exit(1);
}

// Check for duplicates
const existingIndex = projects.findIndex(p => p.id === newProject.id);
if (existingIndex >= 0) {
  console.log(`Updating existing project: ${newProject.id}`);
  projects[existingIndex] = newProject;
} else {
  console.log(`Adding new project: ${newProject.id}`);
  projects.unshift(newProject);
}

// Format with proper indentation
const formattedProjects = JSON.stringify(projects, null, 2);

// Replace the entire file
const newContent = `${marker}\nexport const projects = ${formattedProjects};\n`;

fs.writeFileSync(projectsPath, newContent);
console.log('✓ Successfully updated projects.js');
