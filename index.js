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

console.log(`Cloning repository...`)
const checkedOut = runCommand(
    `git clone --depth 1 --recursive https://github.com/accretence/next-dashboard ${repoName}`
)
if (!checkedOut) process.exit(-1)

console.log(`Installing dependencies...`)
const installedDeps = runCommand(`cd ${repoName} && npm install`)
if (!installedDeps) process.exit(-1)

runCommand(`cd ${repoName} && rm -rf .git`)
runCommand(`cd ${repoName} && git init`)
runCommand(`cd ${repoName} && git add .`)
runCommand(`cd ${repoName} && git commit -m "Initial Commit"`)

console.log(
    'Congratulations! You are ready. Follow the following commands to start'
)
console.log(`cd ${repoName} && npm run dev`)
