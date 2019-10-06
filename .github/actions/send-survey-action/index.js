const core = require("@actions/core");
const github = require("@actions/github");
const octokit = new github.GitHub(process.env.GITHUB_TOKEN);
const { context } = github;

(async () => {
  try {
    const { data: labels } = await octokit.issues.listLabelsOnIssue({
      ...context.repo,
      issue_number: context.issue.number
    });

    const hasContentLabel = labels
      .map(label => label.name)
      .includes(core.getInput('label'));

    if (hasContentLabel) {
      await octokit.issues.createComment({
        ...context.repo,
        issue_number: context.issue.number,
        body: core.getInput('message')
      });
    }
  } catch (err) {
    core.setFailed(err.message);
  }
})();
