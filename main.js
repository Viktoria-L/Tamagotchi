class Pet {
  constructor(name, animalType) {
    this.name = name;
    this.animalType = animalType;
    this.tiredness = 50;
    this.hunger = 50;
    this.loneliness = 50;
    this.happiness = 50;
  }

  nap() {
    if (this.tiredness > 40) {
      this.tiredness -= 20;
    } else {
      this.tiredness = 0;
    }
    if (this.hunger < 100) {
      this.hunger += 10;
    } else {
      this.hunger = 100;
    }
    if (this.loneliness < 100) {
      this.loneliness += 10;
    } else {
      this.loneliness = 100;
    }
    if (this.happiness > 10) {
      this.happiness -= 10;
    } else {
      this.happiness = 0;
    }

    actionText(`${this.name} took a nap!`);
  }

  play() {
    if (this.tiredness < 70) {
      if (this.tiredness < 100) {
        this.tiredness += 20;
      } else {
        this.tiredness = 100;
      }
      if (this.hunger < 100) {
        this.hunger += 20;
      } else {
        this.hunger = 100;
      }
      if (this.loneliness > 10) {
        this.loneliness -= 10;
      } else {
        this.loneliness = 0;
      }

      if (this.happiness < 100) {
        this.happiness += 30;
      } else {
        this.happiness = 100;
      }
      actionText(`You played with ${this.name}!`);
    } else {
      actionText(`${this.name} is to tired to play.`);
    }
  }
  eat() {
    if (this.tiredness < 100) {
      this.tiredness += 10;
    } else {
      this.tiredness = 100;
    }
    if (this.hunger > 60) {
      this.hunger -= 20;
    } else {
      this.hunger = 0;
    }
    actionText(`${this.name} thanks you for the food!`);
  }
}

const tamagotchiDiv = document.querySelector(".tamagotchi");
const infoDiv = document.querySelector(".info");
let tamagotchiList = [];
//La till en tamagotchi för test av styling
// let cat = new Pet("Tamagotchi", "Cat");
// tamagotchiList.push(cat);

const addBtn = document.querySelector(".addbtn");

addBtn.addEventListener("click", () => {
  console.log("Du klicka på create");
  addTamagotchi();
  renderTamagotchi();
});
const dropdown = document.getElementById("typedropdown");

let addTamagotchi = () => {
  let animalName = document.querySelector("#animalname").value;
  const selectedAnimalIndex = dropdown.selectedIndex;
  const selectedAnimalValue = dropdown.options[selectedAnimalIndex].value;

  let newPet = new Pet(animalName, selectedAnimalValue);

  tamagotchiList.push(newPet);
  console.log(tamagotchiList);
};

let renderTamagotchi = () => {
  tamagotchiDiv.innerHTML = "";

  tamagotchiList.forEach((pet) => {
    let newDiv = document.createElement("div");
    newDiv.className = "newpetdiv";
    newDiv.innerHTML = `
  <h2>${pet.name}</h2>
  <div class="displayDiv">
  <img src="./assets/${pet.animalType}.png" width="128px" height="128px" />
  <div class="statsDiv">
  <div class="stats"><p>&#128564;</p><progress id="tiredprog" value="${pet.tiredness}" max="100"></progress></div>
  <div class="stats"><p>&#127829;</p><progress id="hungerprog" value="${pet.hunger}" max="100"></progress></div>
  <div class="stats"><p>&#128557;</p><progress id="lonelinessprog" value="${pet.loneliness}" max="100"></progress></div>
  <div class="stats"><p>&#128525;</p><progress id="happinessprog" value="${pet.happiness}" max="100"></progress></div>
  </div>
  </div>
   `;
    tamagotchiDiv.append(newDiv);

    if (
      pet.tiredness === 100 ||
      pet.loneliness === 100 ||
      pet.hunger === 100 ||
      pet.happiness === 0
    ) {
      showModal(`You killed ${pet.name}`);
      actionText(
        `You killed ${pet.name} because some of the stats become to high or to low. Here are the stats:\n
        Tired: ${pet.tiredness}\n
        Hunger: ${pet.hunger}\n
        Loneliness: ${pet.loneliness}\n
        Happiness: ${pet.happiness}`
      );

      let restartBtn = document.createElement("button");
      restartBtn.innerText = "Restart";
      newDiv.appendChild(restartBtn);
      restartBtn.addEventListener("click", () => {
        location.reload();
      });
    } else {
      let buttonDiv = document.createElement("div");
      buttonDiv.className = "buttonDiv";
      newDiv.append(buttonDiv);

      let napBtn = document.createElement("button");
      napBtn.innerText = "Nap";
      let playBtn = document.createElement("button");
      playBtn.innerText = "Play";
      let eatBtn = document.createElement("button");
      eatBtn.innerText = "Eat";

      buttonDiv.append(napBtn, playBtn, eatBtn);

      napBtn.addEventListener("click", () => {
        pet.nap();
        renderTamagotchi();
      });
      playBtn.addEventListener("click", () => {
        pet.play();
        renderTamagotchi();
      });
      eatBtn.addEventListener("click", () => {
        pet.eat();
        renderTamagotchi();
      });
    }
  });
};

renderTamagotchi();

function showModal(text) {
  let modal = document.createElement("div");
  let div = document.querySelector(".newpetdiv");
  modal.innerText = text;
  modal.className = "update-modal";
  div.innerHTML = "";
  div.prepend(modal);
  setTimeout(() => {
    div.removeChild(modal);
  }, 2000);
}

function actionText(text) {
  infoDiv.innerHTML = "";
  let p = document.createElement("p");
  p.innerText = text;
  infoDiv.append(p);
}
