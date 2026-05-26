let carottes = 0;
let autoHarvesters = 0;
let harvesterprice = 10;
const productionRate = 1;
const carottesDiv = document.getElementById("carottes");
const recolterBtn = document.getElementById("recolterBtn");
const acheterBtn = document.getElementById("buyHarvesterBtn");
const autoHarvestersDiv = document.getElementById("autoHarvesters");
const resetgameBtn = document.getElementById("resetgame");

function sauvegarder() {
    localStorage.setItem("carottes", carottes);
    localStorage.setItem("autoHarvesters", autoHarvesters);
    localStorage.setItem("harvesterprice", harvesterprice);
}

function charger() {
    carottes = parseInt(localStorage.getItem("carottes")) || 0;
    autoHarvesters = parseInt(localStorage.getItem("autoHarvesters")) || 0;
    harvesterprice = parseInt(localStorage.getItem("harvesterprice")) || 10;

    carottesDiv.textContent = "Carottes : " + carottes;
    autoHarvestersDiv.textContent = "auto Harvesters : " + autoHarvesters;
    acheterBtn.textContent = "Acheter un auto-harvester (coût : " + harvesterprice + " carottes)";
}

function recolter() {
    carottes += 1;
    carottesDiv.textContent = "Carottes : " + carottes;

    const plusOne = document.createElement("span");
    plusOne.textContent = "+1";
    plusOne.classList.add("increment");

    const rect = recolterBtn.getBoundingClientRect();
    plusOne.style.left = (recolterBtn.offsetLeft + recolterBtn.offsetWidth / 2 - 10) + "px";
    plusOne.style.top = (recolterBtn.offsetTop - 10) + "px";

    document.getElementById("container").appendChild(plusOne);
    const width = plusOne.offsetWidth;
    plusOne.style.left = (recolterBtn.offsetLeft + recolterBtn.offsetWidth / 2 - width / 2) + "px";

    setTimeout(() => {
        plusOne.remove();
    }, 800);

    sauvegarder();
}

function buyHarvester() {
    if (carottes >= harvesterprice) {
        carottes -= harvesterprice;
        autoHarvesters += 1;
        harvesterprice = Math.floor(harvesterprice * 1.2);

        acheterBtn.textContent = "Acheter un auto-harvester (coût : " + harvesterprice + " carottes)";
        carottesDiv.textContent = "Carottes : " + carottes;
        autoHarvestersDiv.textContent = "auto Harvesters : " + autoHarvesters;

        sauvegarder();
    } else {
        alert("Pas assez de carottes !");
    }

}
recolterBtn.addEventListener("click", recolter);
acheterBtn.addEventListener("click", buyHarvester);

setInterval(() => {
    const gain = autoHarvesters * productionRate;
    if (gain > 0) {
        carottes += gain;
        carottesDiv.textContent = "Carottes : " + carottes;

        const plusGain = document.createElement("span");
        plusGain.textContent = "+" + gain;
        plusGain.classList.add("increment");

        plusGain.style.left = (carottesDiv.offsetLeft + carottesDiv.offsetWidth / 2 - 10) + "px";
        plusGain.style.top = (carottesDiv.offsetTop - 20) + "px";

        document.getElementById("container").appendChild(plusGain);

        setTimeout(() => {
            plusGain.remove();
        }, 800);

        sauvegarder();
    }
}, 1000);

function resetgameFunction() {
    if (confirm("Voulez-vous vraiment réinitialiser votre partie ?")) {
        localStorage.removeItem("carottes");
        localStorage.removeItem("autoHarvesters");
        localStorage.removeItem("harvesterprice");

        carottes = 0;
        autoHarvesters = 0;
        harvesterprice = 10;

        carottesDiv.textContent = "Carottes : " + carottes;
        autoHarvestersDiv.textContent = "auto Harvesters : " + autoHarvesters;
        acheterBtn.textContent = "Acheter un auto-harvester (coût : " + harvesterprice + " carottes)";
    }
}
resetgameBtn.addEventListener("click", resetgameFunction);
charger();