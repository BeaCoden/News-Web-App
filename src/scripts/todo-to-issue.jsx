const fs = require("fs");
const glob = require("glob");
const { Octokit } = require("@octokit/rest");

//  GitHub-Token und Repository-Informationen aus Umgebungsvariablen
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const repoFullName = process.env.GITHUB_REPOSITORY;
const [owner, repo] = repoFullName.split("/");

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Funktion, um ein Issue zu erstellen
async function createIssue(title, body) {
  try {
    const { data } = await octokit.issues.create({
      owner,
      repo,
      title,
      body,
    });
    console.log(`Created issue #${data.number}: ${title}`);
  } catch (error) {
    console.error("Error creating issue:", error);
  }
}

// Suche in allen relevanten Dateien nach Zeilen mit "TODO:"
glob("**/*.{js,jsx,ts,tsx,md}", (err, files) => {
  if (err) {
    console.error("Error finding files:", err);
    return;
  }
  const todos = [];
  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    const regex = /\/\/\s*TODO:\s*(.*)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      todos.push({ file, text: match[1].trim() });
    }
  });

  console.log(`Found ${todos.length} TODO(s)`);

  // Issue für jedes TODO erstellen
  todos.forEach(async (todo) => {
    const issueTitle = `TODO in ${todo.file}: ${todo.text.substring(0, 50)}`;
    const issueBody = `Ein TODO wurde in der Datei \`${todo.file}\` gefunden:\n\n${todo.text}`;
    await createIssue(issueTitle, issueBody);
  });
});
