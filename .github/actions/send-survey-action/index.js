const github = require('@actions/github');
const {context} = github;
const octokit = new github.GitHub(process.env.GITHUB_TOKEN);

(async () => {
  console.log(JSON.stringify(context, undefined, 2));
  await octokit.issues.create({
    ...context.repo,
    title: 'New issue!',
    body: 'Hello Universe!'
  })
})();