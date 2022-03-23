// Game States
// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You  can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// if the enemy-robot's health is zero or less, exit from the fight loop.
// if(enemyHealth <= 0){
//     break;
// }


var fight = function (enemyName) { //this is function expression
    // repeat and execute as long as the enemy-robot is alive
    while (playerHealth > 0 && enemyHealth > 0) {


        // Alert players that they are starting the round
        // window.alert("Welcome to Robot Gladiators!");
        // ask player if  they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {
            // remove enemy's health by subtracting the amount set in the playerAttack variable
            enemyHealth -= playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            // check enemy's health
            if (enemyHealth <= 0) {
                console.log(enemyName + " has died!");
                break;
            } else {
                console.log(enemyName + " still has " + enemyHealth + " health left.");
            }

            // remove player's health by subtracting the amount set in the enemyAttack variable
            playerHealth -= enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            // check player's health
            if (playerHealth <= 0) {
                console.log(playerName + " has died!");
            } else {
                console.log(playerName + " still has " + playerHealth + " health left.");
            }
            // if player choses to skip
        } else if (promptFight === 'skip' || promptFight === 'SKIP') {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                console.log(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney -= 10;
                console.log("playerMoney", playerMoney);
                break;
            }
            // if no (false), ask question again by running fight() again
            else {
                fight();
            }
            // if player did not chose 1 or 2 in prompt
        } else {
            console.log("You need to choose a valid option. Try again!");
        }
    }// end of while loop
};  // end of fight function

for (var i = 0; i < enemyNames.length; i++) {
    // debugger;
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50
    fight(pickedEnemyName);
}

/* So now when we reply with "skip," 10 playerMoney credits are deducted from our total and we no longer face the same opponent just as planned.

Now we can apply our understanding of the break statement to change the conditional statements in the while loop regarding the fight or skip prompt. Because we can use the break statement to exit the loop, we'll rearrange the prompt for the fight or skip conditional statements. Essentially, we'll check whether the prompt was replied to with a skip. If not, we'll let the fight round continue.

Let's move the skip conditional statement to the top and convert it from an else if to an if statement, as shown in the following code: */