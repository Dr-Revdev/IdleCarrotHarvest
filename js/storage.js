import { gameState } from "./state.js";

export function saveGame() {
    localStorage.setItem("carottes", gameState.carottes);
    localStorage.setItem("autoHarvesters", gameState.autoHarvesters);
    localStorage.setItem("harvesterPrice", gameState.harvesterPrice);
}

export function loadGame() {
    gameState.carottes = parseInt(localStorage.getItem("carottes")) || 0;
    gameState.autoHarvesters = parseInt(localStorage.getItem("autoHarvesters")) || 0;
    gameState.harvesterPrice = parseInt(localStorage.getItem("harvesterPrice")) || 10;
}