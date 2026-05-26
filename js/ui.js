export const carottesDiv = document.getElementById("carottes");
export const recolterBtn = document.getElementById("recolterBtn");
export const acheterBtn = document.getElementById("buyHarvesterBtn");
export const autoHarvestersDiv = document.getElementById("autoHarvesters");
export const resetgameBtn = document.getElementById("resetgame");

export function updateDisplay(gameState) {
    carottesDiv.textContent = "Carottes : " + gameState.carottes;
    autoHarvestersDiv.textContent = "auto Harvesters : " + gameState.autoHarvesters;
    acheterBtn.textContent = "Acheter un auto-harvester (coût : " + gameState.harvesterPrice + " carottes)";
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