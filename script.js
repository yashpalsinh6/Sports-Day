function OpeningCeremony(callback) {
    
    setTimeout(() => {
        const score = {red: 0, blue: 0, green: 0, yellow: 0};
        console.log("Let the games begin");
        callback(score, Race100M);
    }, 1000);
}

function Race100M(score, callback) {
    console.log("Race 100M starts!");
    const timeRed = Math.floor(Math.random() * 6) + 10;
    const timeBlue = Math.floor(Math.random() * 6) + 10;
    const timeGreen = Math.floor(Math.random() * 6) + 10;
    const timeYellow = Math.floor(Math.random() * 6) + 10;

    const times = {red: timeRed, blue: timeBlue, green: timeGreen, yellow: timeYellow};
    const sortedTimes = Object.keys(times).sort((a, b) => times[a] - times[b]);

    score[sortedTimes[0]] += 50;
    score[sortedTimes[1]] += 25;

    console.log("Race 100M completed!");
    console.log("Updated Score:", score);
    console.log("Winner: ",sortedTimes[0], " Second: ", sortedTimes[1]);
    setTimeout(() => {
        callback(score, LongJump);
    }, 3000);
}

function LongJump(score, callback) {
    console.log("Long Jump starts!");
    const colors = ['red', 'blue', 'green', 'yellow'];
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];
    score[selectedColor] += 150;

    console.log("Long Jump completed!");
    console.log("Updated Score:", score);
    console.log("Winner: ", selectedColor);
    setTimeout(() => {
        callback(score, HighJump);
    }, 2000);
}

function HighJump(score, callback) {
    console.log("High Jump starts!");
    const userInput = prompt("What colour secured the highest jump?");
    let isValidInput = false;

    if (userInput) {
        const color = userInput.toLowerCase();
        if (color === 'red' || color === 'blue' || color === 'green' || color === 'yellow') {
            score[color] += 100;
            isValidInput = true;
        }
    }

    if (!isValidInput) {
        console.log("Event was cancelled or invalid input!");
    }

    console.log("High Jump completed!");
    console.log("Updated Score:", score);
    setTimeout(() => {
        callback(score, AwardCeremony);
    });
}

function AwardCeremony(score) {
    console.log("Award Ceremony begins!");
    console.log("Final Scores:");
    const sortedScores = Object.entries(score).sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < sortedScores.length; i++) {
        console.log(`${sortedScores[i][0]} came ${ordinalSuffix(i + 1)} with ${sortedScores[i][1]} points.`);
    }
}

function ordinalSuffix(i) {
    const j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

// Start the sports day
OpeningCeremony((score, nextCallback) => {
    Race100M(score, nextCallback);
});

