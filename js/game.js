import { saveGame, loadGame } from "./storage.js";
import { carrotsDiv, harvestBtn, buyBtn, resetgameBtn, updateDisplay, showIncrementText } from "./ui.js";
import { gameState, initialGameState } from "./state.js";

function harvestCarrot() {
    gameState.carrots += 1;
    updateDisplay(gameState);

    showIncrementText("+1", harvestBtn);

    saveGame();
}

function canBuyHarvester() {
    return gameState.carrots >= gameState.harvesterPrice;
}

function buyHarvester() {
    if (!canBuyHarvester()) {
        alert("Pas assez de carotte !");
        return;
    }

    gameState.carrots -= gameState.harvesterPrice;
    gameState.autoHarvesters += 1;
    gameState.harvesterPrice = Math.floor(gameState.harvesterPrice * 1.2);

    updateDisplay(gameState);
    saveGame();

}

function produceAutomatically() {

    const gain = gameState.autoHarvesters * gameState.productionRate;

    if (gain <= 0) {
        return;
    }

    gameState.carrots += gain;
    updateDisplay(gameState);
    showIncrementText("+" + gain, carrotsDiv);
    saveGame();
}

function resetGame() {
    const confirmation = confirm("Voulez-vous vraiment réinitialiser votre partie ?");

    if (!confirmation) {
        return;
    }

    Object.assign(gameState, initialGameState);

    updateDisplay(gameState);
    saveGame();
}

export function startGame() {
    harvestBtn.addEventListener("click", harvestCarrot);
    buyBtn.addEventListener("click", buyHarvester);
    resetgameBtn.addEventListener("click", resetGame);

    loadGame();
    updateDisplay(gameState);

    setInterval(produceAutomatically, 1000);
}