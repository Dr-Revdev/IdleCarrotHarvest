export const carrotsDiv = document.getElementById("carrots");
export const harvestBtn = document.getElementById("harvestBtn");
export const buyBtn = document.getElementById("buyHarvesterBtn");
export const autoHarvestersDiv = document.getElementById("autoHarvesters");
export const resetgameBtn = document.getElementById("resetgame");

export function updateDisplay(gameState) {
    carrotsDiv.textContent = "Carottes : " + gameState.carrots;
    autoHarvestersDiv.textContent = "auto Harvesters : " + gameState.autoHarvesters;
    buyBtn.textContent = "Acheter un auto-harvester (coût : " + gameState.harvesterPrice + " carottes)";
}

export function showIncrementText(text, targetElement) {
    const increment = document.createElement("span");
    increment.textContent = text;
    increment.classList.add("increment");

    increment.style.left = (targetElement.offsetLeft + targetElement.offsetWidth / 2 - 10) + "px";
    increment.style.top = (targetElement.offsetTop - 10) + "px";

    document.getElementById("container").appendChild(increment);

    const width = increment.offsetWidth;
    increment.style.left = (targetElement.offsetLeft + targetElement.offsetWidth / 2 - width / 2) + "px";

    setTimeout(() => {
        increment.remove();
    }, 800);
}