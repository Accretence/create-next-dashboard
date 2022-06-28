#!/usr/bin/env node
const { execSync } = require('child_process')

const runCommand = (command) => {
	try {
		execSync(`${command}`, { stdio: 'inherit' })
	} catch (e) {
		console.error('Failed to execute ${command}', e)
		return false
	}
	return true
}

const repoName = process.argv[2]
const gitCheckoutCommand = `git clone --depth 1 --recursive https://github.com/accretence/next-dashboard-boilerplate ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`

console.log(`Cloning the repository with name ${repoName}`)
const checkedOut = runCommand(gitCheckoutCommand)
if (!checkedOut) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand(installDepsCommand)
if (!installedDeps) process.exit(-1)

console.log(
	'Congratulations! You are ready. Follow the following commands to start'
)
console.log(`cd ${repoName} && npm run dev`)
