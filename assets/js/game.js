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
        // ask player if  they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // if player choses to skip
        if (promptFight === 'skip' || promptFight === 'SKIP') {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        // remove enemy's health by subtracting the amount set in the playerAttack variable
        //generates random damage value based on player's attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            console.log("playerMoney", playerMoney);//to check and remove
            // award player money for winning
            playerMoney += 20;
            console.log("playerMoney", playerMoney);//to check and remove
            break;  // leave while() loop since enemy is dead
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        // remove player's health by subtracting the amount set in the enemyAttack variable
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );
        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break; // leave while() loop if player is dead
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }// end of while loop
};  // end of fight function

var startGame = function () {   // function to start a new game
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {     // fight each enemy robot by looping over them and fighting them one at a time
        if (playerHealth > 0) {     // if player is still alive, keep fighting
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));  // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            var pickedEnemyName = enemyNames[i];        // pick new enemy to fight based on the index of the enemyNames array

            // reset enemyHealth before starting new fight
            enemyHealth = randomNumber(40, 60);

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
            if (playerHealth > 0 && i < enemyNames.length - 1) {     // if player is still alive and we're not at the last enemy in the array
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before next round?");
                // If yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {        // if player is not alive, break out of the loop and let endGame function run
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }

    }
    endGame();   // after loop ends, we are either out of playerHealth or enemies to fight, so run the endGame function
}
// function to end the entire game
var endGame = function () { // function declared as expression with var keyword
    if (playerHealth > 0) { // if player is still alive, player wins!
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You've lost your robot in battle.")
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");   // ask player if they'd like to play again


    if (playAgainConfirm) {
        startGame();    //restart the game
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {    // go to shop between battles function
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                // increase health and decrease money
                playerHealth += 20;
                playerMoney -= 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                //increase attack and decrease money
                playerAttack += 6;
                playerMoney -= 7;
            } else {
                window.alert("You don't have enough money!");

            }
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

var randomNumber = function (min, max) { //function to generate a random numeric value
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

startGame();// start the game when the page loads