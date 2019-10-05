const core = require('@actions/core');
const github = require('@actions/github');
const octokit = new github.GitHub(process.env.GITHUB_TOKEN);
const {context} = github;

(async () => {
  try {
    if (context.issue) {
      console.log('context.issue', context.issue);
    }
    console.log('context.repo', context.repo);
    await octokit.issues.createComment({
      ...context.repo,
      issue_number: context.payload.issue.number,
      body: 'Do a barrel roll, @robdodson!'
    });
  } catch(err) {
    core.setFailed(err.message);
  }
})();