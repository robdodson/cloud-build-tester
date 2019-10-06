const core = require("@actions/core");
const github = require("@actions/github");
const octokit = new github.GitHub(process.env.GITHUB_TOKEN);
const { context } = github;
const CONTENT_LABEL = "content proposal";

(async () => {
  try {
    const labels = await octokit.issues.listLabelsOnIssue({
      ...context.repo,
      issue_number: context.issue.number
    });

    JSON.stringify(labels, undefined, 2);

    const hasContentLabel = labels
      .map(label => label.name)
      .includes(CONTENT_LABEL);

    if (hasContentLabel) {
      await octokit.issues.createComment({
        ...context.repo,
        issue_number: context.issue.number,
        body: "Do a barrel roll, @robdodson!"
      });
    }
  } catch (err) {
    core.setFailed(err.message);
  }
})();
