const core = require('@actions/core');
const github = require('@actions/github');
const octokit = new github.GitHub(process.env.GITHUB_TOKEN);
const {context} = github;

(async () => {
  try {
    const labels = await octokit.issues.listLabelsOnIssue({
      ...context.repo,
      issue_number: context.issue.number,
    });

    console.log(JSON.stringify(labels, undefined, 2));

    await octokit.issues.createComment({
      ...context.repo,
      issue_number: context.issue.number,
      body: 'Do a barrel roll, @robdodson!'
    });
  } catch(err) {
    core.setFailed(err.message);
  }
})();