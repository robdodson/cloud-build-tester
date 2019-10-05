(async () => {
  const octokit = new github.GitHub(process.env.GITHUB_TOKEN);
  const {repository} = await octokit.graphql(
    `
      {
        repository(owner: "robdodson", name: "cloud-build-tester") {
          issues(last: 3) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    `
  );
  console.log(repository);
})();