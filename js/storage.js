import { gameState } from "./state.js";

export function saveGame() {
    localStorage.setItem("carrots", gameState.carrots);
    localStorage.setItem("autoHarvesters", gameState.autoHarvesters);
    localStorage.setItem("harvesterPrice", gameState.harvesterPrice);
}

export function loadGame() {
    gameState.carrots = parseInt(localStorage.getItem("carrots")) || 0;
    gameState.autoHarvesters = parseInt(localStorage.getItem("autoHarvesters")) || 0;
    gameState.harvesterPrice = parseInt(localStorage.getItem("harvesterPrice")) || 10;
}