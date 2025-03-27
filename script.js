const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");

const totalLiters = 2; // Total daily goal in liters
const cupVolume = 0.25; // Each cup represents 250ml (0.25L)

updateBigCup();

smallCups.forEach((cup, index) => {
    cup.addEventListener("click", () => toggleCup(index));
});

function toggleCup(index) {
    // Handle cases where clicking a full cup should unfill it and others after it
    if (smallCups[index].classList.contains("full") && 
        !smallCups[index].nextElementSibling?.classList.contains("full")) {
        index--;
    }

    // Update the UI
    smallCups.forEach((cup, i) => {
        if (i <= index) {
            cup.classList.add("full");
        } else {
            cup.classList.remove("full");
        }
    });

    updateBigCup();
}

function updateBigCup() {
    const fullCups = document.querySelectorAll(".cup-small.full").length;
    const totalCups = smallCups.length;

    if (fullCups === 0) {
        percentage.style.height = "0";
        percentage.textContent = "";
    } else {
        percentage.style.height = `${(fullCups / totalCups) * 100}%`;
        percentage.textContent = `${(fullCups / totalCups) * 100}%`;
    }

    if (fullCups === totalCups) {
        remained.style.visibility = "hidden";
        remained.style.height = "0";
    } else {
        remained.style.visibility = "visible";
        remained.style.height = "auto";
        liters.textContent = `${(totalLiters - (fullCups * cupVolume)).toFixed(2)}L`;
    }
}
