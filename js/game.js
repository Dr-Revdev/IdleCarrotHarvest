import { gameState } from "./state.js";
import { saveGame, loadGame } from "./storage.js";
import { carottesDiv, recolterBtn, acheterBtn, resetgameBtn, updateDisplay, showIncrementText } from "./ui.js";

function harvestCarrot() {
    gameState.carottes += 1;
    updateDisplay(gameState);

    showIncrementText("+1", recolterBtn);

    saveGame();
}

function canBuyHarvester() {
    return gameState.carottes >= gameState.harvesterPrice;
}

function buyHarvester() {
    if (!canBuyHarvester()) {
        alert("Pas assez de carotte !");
        return;
    }

    gameState.carottes -= gameState.harvesterPrice;
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

    gameState.carottes += gain;
    updateDisplay(gameState);
    showIncrementText("+" + gain, carottesDiv);
    saveGame();
}

function resetGame() {
    const confirmation = confirm("Voulez-vous vraiment réinitialiser votre partie ?");

    if (!confirmation) {
        return;
    }

    gameState.carottes = 0;
    gameState.autoHarvesters = 0;
    gameState.harvesterPrice = 10;

    updateDisplay(gameState);
    saveGame();
}

export function startGame() {
    recolterBtn.addEventListener("click", harvestCarrot);
    acheterBtn.addEventListener("click", buyHarvester);
    resetgameBtn.addEventListener("click", resetGame);

    loadGame();
    updateDisplay(gameState);

    setInterval(produceAutomatically, 1000);
}