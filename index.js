'use strict'
const core = require('@actions/core')
const github = require('@actions/github')
const context = require('@actions/github')


const main = async () => {
  const token = core.getInput('github-token')
  const number = core.getInput('number')
  const method = core.getInput('method')
  const repoString = core.getInput('repo')
  // console.log('its working');

  let repoObject
  if (repoString) {
    const [owner, repo] = repoString.split('/')
    repoObject = { owner, repo }
  } else {
    repoObject = github.context.repo
  }

  const octokit = new github.getOctokit(token);

  await octokit.pulls.merge({
    ...repoObject,
    pull_number: number,
    merge_method: method
  })
}

main().catch(err => core.setFailed(err.message))