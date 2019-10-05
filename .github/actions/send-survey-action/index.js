const core = require('@actions/core');
const github = require('@actions/github');
const {context} = github;
const octokit = new github.GitHub(process.env.GITHUB_TOKEN);

(async () => {
  try {
    const params = context.issue({ body: 'Do a thing @robdodson.' });
    await octokit.issues.createComment(params);
  } catch(err) {
    core.setFailed(err.message);
  }
})();