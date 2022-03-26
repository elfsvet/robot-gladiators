// Game States
// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less


// if the enemy-robot's health is zero or less, exit from the fight loop.
// if(enemy.health <= 0){
//     break;
// }

var fightOrSkip = function () {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // Conditional Recursive Function Call
    // if the `promptFight` is NOT a valid value, then execute the following statements.

    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase(); // makes it lower case

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);
            // return true if player wants to leave
            return true;
        }
    }
}

var fight = function (enemy) { //this is function expression
    // repeat and execute as long as the enemy-robot is alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they'd like to fight or skip using fightOrSkip function

        if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
        }

        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        //generates random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            console.log("playerMoney", playerInfo.money);//to check and remove
            // award player money for winning
            playerInfo.money += 20;
            console.log("playerMoney", playerInfo.money);//to check and remove
            break;  // leave while() loop since enemy is dead
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // remove player's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );
        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break; // leave while() loop if player is dead
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }// end of while loop
};  // end of fight function

var startGame = function () {   // function to start a new game
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {     // fight each enemy robot by looping over them and fighting them one at a time
        if (playerInfo.health > 0) {     // if player is still alive, keep fighting
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));  // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            var pickedEnemyObj = enemyInfo[i];        // pick new enemy to fight based on the index of the enemyNames array

            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // pass the pickedenemy variable's value into the fight function, where it will assume the value of the enemy parameter
            fight(pickedEnemyObj);
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {     // if player is still alive and we're not at the last enemy in the array
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
    endGame();   // after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endGame function
}
// function to end the entire game
var endGame = function () { // function declared as expression with var keyword
    if (playerInfo.health > 0) { // if player is still alive, player wins!
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
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
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
      );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action
    switch (shopOptionPrompt) {
        // case "REFILL":
        // case "refill":
        case 1:
            playerInfo.refillHealth();
            break;
        // case "UPGRADE":
        // case "upgrade":
        case 2:
            playerInfo.upgradeAttack();
            break;
        // case "LEAVE":
        // case "leave":
        case 3:
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

var getPlayerName = function () {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

// You  can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame();// start the game when the page loads