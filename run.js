#!/usr/bin/env node

// Othman4dev © 2024, All rights reserved.

// Commix - A tool to generate random commits over a specified date range.

// Import required modules

import lodash from 'lodash';
import dayjs from 'dayjs';
import chalk from 'chalk';
import fs from 'fs';
import { execSync } from 'child_process';
import readline from 'readline';
import ora from 'ora';

let authorName = "";
let authorEmail = "";
let percentage = 0;
let processStatus = false;

// Setup user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Show about information
function showAbout() {
    const art = `
     █████╗  █████╗ ███╗   ███╗███╗   ███╗██╗██╗  ██╗
    ██╔══██╗██╔══██╗████╗ ████║████╗ ████║██║╚██╗██╔╝
    ██║  ╚═╝██║  ██║██╔████╔██║██╔████╔██║██║ ╚███╔╝ 
    ██║  ██╗██║  ██║██║╚██╔╝██║██║╚██╔╝██║██║ ██╔██╗ 
    ╚█████╔╝╚█████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║██╔╝╚██╗
     ╚════╝  ╚════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝
    `;
    console.log(chalk.magenta(art));
    console.log(chalk.italic.magenta("Commix - A tool to generate random commits over a specified date range.\n"));
    console.log(chalk.italic.magenta(`Version: 1.0.0\n`));
    console.log(chalk.bold.bgMagenta("Author: Othman4dev © \n"));
}

// Ask user for input
function askQuestion(query) {
    return new Promise(resolve => {
        // Display the query in magenta color
        const coloredQuery = chalk.magenta(query);
        rl.question(coloredQuery, resolve);
    });
}

// List of realistic commit messages
const commitMessages = [
    "Fix bug in user authentication",
    "Refactor code for better readability",
    "Improve performance of the homepage",
    "Add unit tests for the payment module",
    "Update documentation for new API endpoints",
    "Fix typo in the README",
    "Add feature for user profile customization",
    "Fix broken links in the footer",
    "Optimize image loading times",
    "Update dependencies to latest versions",
    "Add new endpoint for user data export",
    "Fix styling issues on mobile devices",
    "Add new feature for dark mode",
    "Update third-party libraries",
    "Fix security vulnerability in authentication",
    "Add new unit tests for edge cases",
    "Refactor code to use design patterns",
    "Improve error handling in the backend",
    "Add new feature for user notifications",
    "Update CSS to use flexbox layout",
    "Fix memory leak in the caching layer",
    "Add new API endpoint for user preferences",
    "Update translations for multiple languages",
    "Fix accessibility issues for screen readers",
    "Add new feature for user avatars",
    "Update database schema for better performance",
    "Fix CORS policy for cross-origin requests",
    "Add new integration tests for the login flow",
    "Update frontend dependencies to latest versions",
    "Fix broken pagination on search results"
];

// Generate random JavaScript code snippets
function generateRandomJSCode() {
    // List of keywords and patterns
    const names = ["handleClick", "fetchData", "processInput", "updateUI", "submitForm", "toggleMenu", "animateElement", "validateInput", "showMessage", "hideModal", "formatDate", "checkStatus", "loadData", "saveSettings", "renderList", "createChart", "displayError", "setCookie", "getLocalStorage", "setSessionStorage", "removeItem"];
    const params = ["a", "b", "data", "e", "value", "x", "y","el","error"];
    const elements = ["#button", ".container", "#input", "window", "document", "#nav", ".footer", ".modal", "form", "header"];
    const events = ["click", "input", "keydown", "load", "submit", "resize", "scroll","mouseover","mouseout","change","focus","blur"];
    const conditions = ["a > b", "data.length > 0", "e.key === 'Enter'", "value !== ''", "x === y", "x !== y", "window.innerWidth > 500", "document.readyState === 'complete'"];
    const logics = [
        "return a + b;",
        "document.body.style.backgroundColor = 'lightblue';",
        "console.log('Processing data...');",
        "alert('Action completed!');",
        "window.location.reload();",
        "e.preventDefault();",
        "data.push(value);",
        "el.classList.add('active');",
        "error.textContent = '';",
        "return x * y;",
        "return x / y;",
        "return x % y;",
        "return x ** y;",
        "return x - y;",
    ];

    // Generate random helpers
    function random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    function randomParams(count) {
        return params.slice(0, count).join(", ");
    }
    
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Patterns for generating JavaScript snippets
    const snippets = [
        `function ${random(names)}(${randomParams(2)}) {
    console.log("${random(names)} called");
    ${random(logics)}
    ${random(logics)}
    ${random(logics)}
}`,
        `document.querySelector("${random(elements)}").addEventListener("${random(events)}", function() {
    console.log("Event ${random(events)} triggered");
    ${random(logics)}
    ${random(logics)}
    ${random(logics)}
});`,
        `if (${random(conditions)}) {
    console.log("${random(names)} condition met");
    ${random(logics)}
    ${random(logics)}
    ${random(logics)}
} else {
    console.log("Condition not met");
}`,
        `for (let i = 0; i < ${randomNumber(5, 20)}; i++) {
    console.log("Loop iteration: " + i);
    ${random(logics)}
    ${random(logics)}
    ${random(logics)}
}`,
        `const ${random(names)} = (${randomParams(3)}) => {
    console.log("${random(names)} arrow function called");
    ${random(logics)}
    ${random(logics)}
    ${random(logics)}
};`,
        `try {
    ${random(logics)}
    ${random(logics)}
    ${random(logics)}
} catch (error) {
    console.error("Error:", error);
}`,
        `switch (${random(params)}) {
    case ${randomNumber(1, 5)}:
        console.log("${random(params)} case 1");
        break;
    default:
        console.log("Default case");
}`
    ];

    // Return a random code snippet
    return snippets[Math.floor(Math.random() * snippets.length)];
}

// Generate random package.json code for less suspicious commits
function generateRandomJSON() {
    const packages = ["react", "express", "lodash", "axios", "moment", "nodemon", "webpack", "babel", "jest", "eslint", "prettier", "typescript", "mongodb", "mysql", "redis", "graphql", "socket.io", "aws-sdk", "firebase", "next.js", "gatsby", "vue", "angular", "svelte", "ember", "jest", "mocha", "chai", "sinon", "enzyme", "cypress", "puppeteer", "jasmine", "karma", "protractor", "nightwatch"];
    function randVersion() {
        return Math.floor(Math.random() * 10);
    }
    const dependencies = {};
    const random = Math.floor(Math.random() * 5) + 5;
    for (let i = 0; i < random; i++) {
        const pkg = packages[Math.floor(Math.random() * packages.length)];
        dependencies[pkg] = `^${randVersion()}.${randVersion()}.${randVersion()}`;
    }

    return JSON.stringify({ dependencies }, null, 2);
}

// The commitCount is not used here, but it could be useful for future enhancements
// Create a simple Node.js app structure and files then put changes to them.
function createAppStructure(commitCount) {
    const directories = ['src', 'tests', 'lib', 'config'];
    const files = [
        { path: 'src/index.js', content: `${generateRandomJSCode()}` },
        { path: 'src/app.js', content: `${generateRandomJSCode()}` },
        { path: 'tests/app.test.js', content: `${generateRandomJSCode()}` },
        { path: 'lib/logger.js', content: `${generateRandomJSCode()}` },
        { path: 'config/settings.json', content: `${generateRandomJSON()}` }
    ];

    // Create directories and files
    directories.forEach(dir => {
        fs.mkdirSync(dir, { recursive: true });
    });

    // Create files with random content
    files.forEach(file => {
        fs.writeFileSync(file.path, file.content);
    });
}

//Make a commit with a specific date and message
function makeCommit(commitDate, commitMessage) {
    // Stage all changes (suppress output)
    execSync('git add .', { stdio: 'pipe' });

    // Check if there are changes to commit
    const statusOutput = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (statusOutput.trim() === '') {
        console.log(chalk.yellow("No changes to commit."));
        return false;
    }

    // Suppress git commit logs and set the author info
    if (process.platform === 'win32') {
        execSync(`set GIT_AUTHOR_NAME="${authorName}" && set GIT_AUTHOR_EMAIL="${authorEmail}" && set GIT_COMMITTER_NAME="${authorName}" && set GIT_COMMITTER_EMAIL="${authorEmail}" && git commit -m "${commitMessage}" --date="${commitDate}"`, { stdio: 'pipe' });
    } else {
        execSync(`GIT_AUTHOR_NAME="${authorName}" GIT_AUTHOR_EMAIL="${authorEmail}" GIT_COMMITTER_NAME="${authorName}" GIT_COMMITTER_EMAIL="${authorEmail}" git commit -m "${commitMessage}" --date="${commitDate}"`, { stdio: 'pipe' });
    }

    return true;
}

function showProgress(commitCount, totalCommits, percentage) {
    // Calculate the current percentage
    let calculatedPercentage = Math.floor((commitCount / totalCommits) * 100);

    if (calculatedPercentage > percentage) {
        percentage = calculatedPercentage;

        // Create a dynamic progress bar
        const progressBarLength = 25; // Length of the progress bar
        const filledBarLength = Math.floor((percentage / 100) * progressBarLength);
        const emptyBarLength = Math.max(0, progressBarLength - filledBarLength);
        const progressBar = `[${'█'.repeat(filledBarLength)}${'-'.repeat(emptyBarLength)}]`;

        // Clear the current line and move the cursor to the start
        process.stdout.clearLine();
        process.stdout.cursorTo(0);

        // Display the progress bar and percentage
        // If the progress is 100%, show finalizing message
        if (percentage >= 100) {
            process.stdout.write(chalk.greenBright(`▻ Progress: [██████████████████████████] 100% (Finalizing...)`));
        } else {
            process.stdout.write(chalk.blueBright(`▻ Progress: ${progressBar} ${percentage}%`));
        }
    }

    return percentage;
}

// Simulate day commits, with random commit times and messages
async function simulateDayCommits(date, numCommits, commitCount, totalCommits) {
    for (let i = 0; i < numCommits; i++) {
        const commitTime = dayjs(date).add(lodash.random(0, 23), 'hour').add(lodash.random(0, 59), 'minute').format();
        let randomIndex = lodash.random(0, commitMessages.length - 1);
        const commitMessage = commitMessages[randomIndex];
        // Create app structure and make a commit
        createAppStructure(commitCount);
        // Make a commit with the generated date and message
        if (makeCommit(commitTime, commitMessage)) {
            commitCount++;
        }
        percentage = showProgress(commitCount, totalCommits, percentage);
    }
    return commitCount;
}

// Generate commits over time
async function generateCommitsOverTime(startDate, endDate, minCommits, maxCommits, choice, commitLevel) {

    let currentDate = dayjs(startDate);
    const end = dayjs(endDate);
    const totalDays = end.diff(currentDate, 'days') + 1;

    // Warn if exceeding limits
    if (totalDays > 730) {
        let validation = await askQuestion(chalk.bgRed("⚠ Warning: Generating more than 2 year of commits might take a very long time. Are you sure you want to continue ? [yes/no] :") || 'yes');
        if (validation.toLowerCase() !== 'yes' && validation.toLowerCase() !== 'y') {
            return;
        }
    } else
    if (totalDays > 31 * 6) {
        console.warn();
        let validation = await askQuestion(chalk.yellow("⚠ Warning: Generating more than 6 will take a while, are you sure you want to continue ? [yes/no]:") || 'yes');
        if (validation.toLowerCase() !== 'yes' && validation.toLowerCase() !== 'y') {
            return;
        }
    }

    let totalCommits = 0;
    let commitCount = 0;

    // Calculate the total number of commits to be made
    for (let i = 0; i < totalDays; i++) {
        totalCommits += lodash.random(minCommits, maxCommits);
    }

    try {
        while (currentDate.isBefore(end) || currentDate.isSame(end)) {
            if (choice == 'realistic') {
                const numCommits = parseInt(commitLevel[currentDate.day()], 10);
                commitCount = await simulateDayCommits(currentDate, numCommits, commitCount, totalCommits);
            } else {
                const numCommits = lodash.random(minCommits, maxCommits);
                commitCount = await simulateDayCommits(currentDate, numCommits, commitCount, totalCommits);
            }
            currentDate = currentDate.add(1, 'day');
        }
    } finally {
        processStatus = true;
        console.log(chalk.green('\n▻ Commits generated successfully ☑.'));
    }
    return totalCommits;
}

// Validate date input
function validateDate(date) {
    const today = dayjs();
    const inputDate = dayjs(date);
    if (inputDate.isAfter(today)) {
        throw new Error("\nDate cannot be in the future 🚫.\n");
    }
    return inputDate.format('YYYY-MM-DD');
}

// Validate username
function validateUsername(username) {
    if (!username) {
        throw new Error("Username cannot be empty 🚫.");
    } else if (username.includes(" ")) {
        throw new Error("Username cannot contain spaces 🚫.");
    } else if (username.length > 39) {
        throw new Error("Username is too long.");
    }
}
// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        throw new Error("Email cannot be empty 🚫.");
    } else if (!emailRegex.test(email)) {
        throw new Error("Invalid email format 🚫.");
    } else if (email.length > 254) {
        throw new Error("Email is too long 🚫.");
    }
}

function showEstimatedTime(estimatedTime) {
    const minutes = Math.floor(estimatedTime / 60000); // Convert to minutes
    const seconds = Math.floor((estimatedTime % 60000) / 1000); // Convert the remaining time to seconds

    let timeMessage = `▻ This will take about `;
    
    if (minutes > 0) {
        timeMessage += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    
    if (seconds > 0) {
        timeMessage += `${minutes > 0 ? ' and ' : ''}${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    timeMessage += `, please wait... ⌛\n`;
    
    console.log(chalk.yellowBright.italic(timeMessage));
}


// Main function
async function main() {
    // Commit levels for realistic commit graph
    const commitLevel = ['0', '0', '1', '0', '2', '0', '3', '4', '5', '6', '7', '8', '9', '10'];
    let commitChoice = '';
    // Display the welcome message
    showAbout();

    try {
        // Display the login message
        console.log(chalk.magenta(`
        ░█    ░█▀▀▀█ ░█▀▀█ ▀█▀ ░█▄ ░█ 
        ░█    ░█  ░█ ░█ ▄▄ ░█  ░█░█░█ 
        ░█▄▄█ ░█▄▄▄█ ░█▄▄█ ▄█▄ ░█  ▀█

    If your login credentials are not correct, you will not be able to push commits to your repository.`));

        // Ask the user for their GitHub username and email

        authorName = await askQuestion("\n▻ Enter your username on GitHub: ");
        validateUsername(authorName);

        authorEmail = await askQuestion("\n▻ Enter the email address associated with your account: ");
        validateEmail(authorEmail);

        const startDateInput = await askQuestion("\n▻ Enter the start date (YYYY-MM-DD): ");
        const startDate = validateDate(startDateInput);

        const endDateInput = await askQuestion("\n▻ Enter the end date (YYYY-MM-DD), ( default is today ): ") || dayjs().format('YYYY-MM-DD');
        const endDate = validateDate(endDateInput);

        const realisticCommitChoice = await askQuestion("\n▻ Would you like to leave some empty days for more realistic commit graph ?\n( [yes]: 0-10 commits per day range )( [no]: Enter custom range ) [yes/no]: ") || 'yes';
        let minCommits, maxCommits;

        if (realisticCommitChoice.toLowerCase() === 'yes' || realisticCommitChoice.toLowerCase() === 'y') {
            commitChoice = 'realistic';
            minCommits = 0;
            maxCommits = 10;
        } else {
            commitChoice = 'custom';
            minCommits = parseInt(await askQuestion("\n▻ Enter the minimum number of commits per day: "), 10);
            maxCommits = parseInt(await askQuestion("\n▻ Enter the maximum number of commits per day: "), 10);
        }

        const autoPushChoice = await askQuestion("\n▻ Do you want to automatically push the generated commits to your repository? (yes/no): ") || 'yes';

        process.stdout.write('\x1Bc');

        console.log(chalk.blueBright(`\n▻ Generating commits from ${startDate} to ${endDate} with ${minCommits}-${maxCommits} commits per day ♾️ \n`));

        //sleep for 4 seconds
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });

        // Estimate the time required to generate commits
        const totalDays = dayjs(endDate).diff(dayjs(startDate), 'days') + 1;
        const totalCommits = totalDays * ((minCommits + maxCommits) / 2);
        const averageTimePerCommit = 200;
        const overheadTime = 0;

        // Estimate the time required to generate commits, calculated in seconds by the logic : (totalCommits * averageTimePerCommit)
        const estimatedTime = (totalCommits * averageTimePerCommit) + overheadTime;

        // Show the estimated time to the user
        showEstimatedTime(estimatedTime);

        await generateCommitsOverTime(startDate, endDate, minCommits, maxCommits, commitChoice, commitLevel);

        process.stdout.write('\x1Bc');

        if (autoPushChoice.toLowerCase() === 'yes' || autoPushChoice.toLowerCase() === 'y') {
            if (!processStatus) {
                console.log(chalk.yellowBright("▻ No commits were generated !"));
            } else {
                execSync(`git push origin main`);
                console.log(chalk.green("\n▻ Commits successfully pushed to your repository ☑"));
            }
        } else {
            if (!processStatus) {
                console.log(chalk.yellowBright("▻ No commits were generated !"));
            } else {
                console.log(chalk.yellowBright("▻ Commits were generated ☑, but not pushed !. You can push manually later by running: \n--\n\tgit push\n--"));
            }
        }
    } catch (error) {
        console.error(chalk.red(error.message));
    } finally {
        console.log(chalk.magenta("\n▻ Thank you for using Commix! 🚀"));
        console.log(chalk.magenta("\n▻ Follow me on GitHub:"));
        console.log(chalk.magenta(`
        
        █▀▀█ ▀▀█▀▀ █░░█ █▀▄▀█ █▀▀█ █▀▀▄ ░█▀█░ █▀▀▄ █▀▀ ▀█░█▀ 
        █░░█ ░░█░░ █▀▀█ █░▀░█ █▄▄█ █░░█ █▄▄█▄ █░░█ █▀▀ ░█▄█░ 
        ▀▀▀▀ ░░▀░░ ▀░░▀ ▀░░░▀ ▀░░▀ ▀░░▀ ░░░█░ ▀▀▀░ ▀▀▀ ░░▀░░\n\n`));

        rl.close();
    }
}

main();
