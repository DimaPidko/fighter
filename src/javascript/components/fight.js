import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const playerOneHealthBar = document.getElementById('left-fighter-indicator');
        const playerTwoHealthBar = document.getElementById('right-fighter-indicator');
        const playerOne = { ...firstFighter, currentHealth: firstFighter.health };
        const playerTwo = { ...secondFighter, currentHealth: secondFighter.health };

        document.addEventListener('keydown', event =>
            handleKeyDown(event, playerOne, playerTwo, playerOneHealthBar, playerTwoHealthBar, resolve)
        );
    });
}

function handleKeyDown(event, playerOne, playerTwo, playerOneHealthBar, playerTwoHealthBar, resolve) {
    switch (event.code) {
        case controls.PlayerOneAttack:
            if (!playerOne.isBlocking) {
                const damage = getDamage(playerOne, playerTwo);
                playerTwo.currentHealth -= damage;
                updateHealthBar(playerTwoHealthBar, playerTwo.health, playerTwo.currentHealth);
            }
            break;
        case controls.PlayerTwoAttack:
            if (!playerTwo.isBlocking) {
                const damage = getDamage(playerTwo, playerOne);
                playerOne.currentHealth -= damage;
                updateHealthBar(playerOneHealthBar, playerOne.health, playerOne.currentHealth);
            }
            break;
        case controls.PlayerOneBlock:
            playerOne.isBlocking = true;
            break;
        case controls.PlayerTwoBlock:
            playerTwo.isBlocking = true;
            break;
        case controls.PlayerOneCriticalHitCombination.join('+'):
            // handle critical hit for player one
            break;
        case controls.PlayerTwoCriticalHitCombination.join('+'):
            // handle critical hit for player two
            break;
        default:
            break;
    }

    if (playerOne.currentHealth <= 0 || playerTwo.currentHealth <= 0) {
        resolve(playerOne.currentHealth > 0 ? playerOne : playerTwo);
    }
}

function updateHealthBar(healthBar, maxHealth, currentHealth) {
    const healthPercentage = (currentHealth / maxHealth) * 100;
    healthBar.style.width = `${healthPercentage}%`;
}

export function getDamage(attacker, defender) {
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    const damage = hitPower - blockPower;
    return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() * (2 - 1) + 1;
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.random() * (2 - 1) + 1;
    return fighter.defense * dodgeChance;
}
