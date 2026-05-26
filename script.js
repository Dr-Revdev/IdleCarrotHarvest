const gameState = {
    carottes: 0,
    autoHarvesters: 0,
    harvesterPrice: 10,
    productionRate: 1,
};

const carottesDiv = document.getElementById("carottes");
const recolterBtn = document.getElementById("recolterBtn");
const acheterBtn = document.getElementById("buyHarvesterBtn");
const autoHarvestersDiv = document.getElementById("autoHarvesters");
const resetgameBtn = document.getElementById("resetgame");

function sauvegarder() {
    localStorage.setItem("carottes", gameState.carottes);
    localStorage.setItem("autoHarvesters", gameState.autoHarvesters);
    localStorage.setItem("harvesterPrice", gameState.harvesterPrice);
}

function charger() {
    gameState.carottes = parseInt(localStorage.getItem("carottes")) || 0;
    gameState.autoHarvesters = parseInt(localStorage.getItem("autoHarvesters")) || 0;
    gameState.harvesterPrice = parseInt(localStorage.getItem("harvesterPrice")) || 10;

    updateDisplay();
}

function updateDisplay() {
    carottesDiv.textContent = "Carottes : " + gameState.carottes;
    autoHarvestersDiv.textContent = "auto Harvesters : " + gameState.autoHarvesters;
    acheterBtn.textContent = "Acheter un auto-harvester (coût : " + gameState.harvesterPrice + " carottes)";
}

function showIncrementText(text, targetElement) {
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

function recolter() {
    gameState.carottes += 1;
    updateDisplay();

    showIncrementText("+1", recolterBtn);

    sauvegarder();
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

    updateDisplay();
    sauvegarder();

}
recolterBtn.addEventListener("click", recolter);
acheterBtn.addEventListener("click", buyHarvester);

function produceAutomatically() {
    const gain = gameState.autoHarvesters * gameState.productionRate;

    if (gain <= 0) {
        return;
    }

    gameState.carottes += gain;
    updateDisplay();
    showIncrementText("+" + gain, carottesDiv);
    sauvegarder();
}

setInterval(produceAutomatically, 1000);

function resetgameFunction() {
    if (confirm("Voulez-vous vraiment réinitialiser votre partie ?")) {
        localStorage.removeItem("carottes");
        localStorage.removeItem("autoHarvesters");
        localStorage.removeItem("harvesterPrice");

        gameState.carottes = 0;
        gameState.autoHarvesters = 0;
        gameState.harvesterPrice = 10;

        updateDisplay();
    }
}
resetgameBtn.addEventListener("click", resetgameFunction);
charger();