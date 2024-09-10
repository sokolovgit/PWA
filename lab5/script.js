// 1. Поміняйте місцями контент блоків «3» та «6».

const mainSectionHeader = document.querySelector(".main-section__header");
const asideRightFooter = document.querySelector(".aside-right__footer");

const tempContent = mainSectionHeader.textContent;

mainSectionHeader.textContent = asideRightFooter.textContent;
asideRightFooter.textContent = tempContent;

// 2. Напишіть функцію, яка обчислює площу
// паралелограма, беручи необхідні значення із
// відповідних змінних у скрипті, і виводить
// отриманий результат в кінці контенту в блоці «5».

function calculateParallelogramArea(sideLength, height) {
  if (typeof sideLength !== "number" || typeof height !== "number") {
    return "Error: invalid input";
  }

  return sideLength * height;
}

const sideLength = 5;
const height = 7;
const parallelogramArea = calculateParallelogramArea(sideLength, height);

const mainSection = document.querySelector(".main-section");
const result = document.createElement("p");
result.textContent = `Площа паралелограма: ${parallelogramArea}`;
result.style.textAlign = "center";
mainSection.appendChild(result);



// 3. Напишіть скрипт, який знаходить максимальну
// цифру у заданому натуральному числі, беручи
// необхідне значення із відповідної форми в блоці
// «5», а отриманий результат виводить за допомогою
// діалогового вікна і зберігає в cookies, причому:
// а) при оновленні веб-сторінки в броузері користувачу за допомогою
// діалогового вікна виводиться інформація, збережена в cookies, із
// інформуванням, що після натискання кнопки «ОК» відбудеться видалення
// даних із cookies, і не виводиться згадана вище форма;
// б) при натисканні кнопки «ОК» відповідні cookies видаляються, і виводиться
// наступне діалогове вікно із повідомленням, що cookies видалено, а натискання
// кнопки «ОК» перезавантажує веб-сторінку з початковим станом із наявною
// формою для введення даних.

// 4. Напишіть скрипт, який при настанні події mouseout задає вирівнювання по
// правому краю вмісту блоків «2», «4», «5» при встановленні користувачем
// відповідних радіокнопок у формі і зберігає відповідні значення в localStorage
// броузера так, щоб при наступному відкриванні сторінки властивості
// вирівнювання по правому краю вмісту блоків «2», «4», «5» встановлювались із
// збережених значень в localStorage.

function findMaxDigit(number) {
  if (typeof number !== "number") {
    return "Error: invalid input";
  }

  return Math.max(...number.toString().split("").map(Number));
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((cookie) => cookie.includes(name));

  return cookie ? cookie.split("=")[1] : null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const number = parseInt(event.target.querySelector("#digit").value);
  const maxDigit = findMaxDigit(number);

  setCookie("maxDigit", maxDigit, 1);
  document.querySelector("form").style.display = "none";
  alert(`Максимальна цифра: ${maxDigit} \n
         Дані збережено в cookies`);
});

window.onload = function () {
  const maxDigit = getCookie("maxDigit");
  if (maxDigit) {
    if (
      confirm(
        `Збережена максимальна цифра: ${maxDigit}. Натисніть "OK" для видалення.`
      )
    ) {
      deleteCookie("maxDigit");
      alert("Cookies видалено");
      location.reload();
    }
  } else {
    document.querySelector("form").style.display = "block";
  }

  const blocks = [
    "aside-left",
    "aside-right__content",
    "main-section__content",
  ];
  blocks.forEach((block) => {
    const alignment = localStorage.getItem(block);
    if (alignment === "right") {
      document.querySelector(`.${block}`).style.textAlign = "right";
    }
  });
};

document
  .getElementById("alignment-form")
  .addEventListener("mouseout", (event) => {
    const selectedRadio = document.querySelector(
      'input[name="alignment"]:checked'
    );
    if (selectedRadio) {
      const selectedBlock = selectedRadio.value;
      const blockElement = document.querySelector(`.${selectedBlock}`);
      blockElement.style.textAlign = "right";
      localStorage.setItem(selectedBlock, "right");
    }
  });

document.getElementById("clear-storage").addEventListener("click", () => {
  localStorage.clear();
  alert("Local storage cleared");
});

// 5. Напишіть скрипт створення нумерованого списку:
// а) необхідні елементи форми появляються у відповідних номерних блоках (1..7)
// внаслідок події select на довільному контенті блоку;
// б) кількість пунктів нумерованого списку необмежена;
// в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані
// нумерованого списку зберігаються в localStorage броузера (структуровано на
// ваш розсуд), а сам список додається в кінці наявного вмісту відповідного
// номерного блока;
// г) перезавантаження веб-сторінки призводить до видалення нового вмісту із
// localStorage броузера.

document.getElementById("add-to-list").addEventListener("click", () => {
  const selectedBlock = document.getElementById("block-selector").value;
  const inputValue = document.getElementById("list-item-input").value.trim();

  if (inputValue) {
    const blockElement = document.querySelector(`.${selectedBlock}`);

    let list = blockElement.querySelector("ol");
    if (!list) {
      list = document.createElement("ol");
      blockElement.appendChild(list);
    }

    const listItem = document.createElement("li");
    listItem.textContent = inputValue;
    list.appendChild(listItem);

    document.getElementById("list-item-input").value = ""; // Clear the input
  }
});

document.getElementById("save-list").addEventListener("click", () => {
  const blocks = [
    "header",
    "aside-left",
    "main-section__header",
    "aside-right__content",
    "main-section__content",
    "aside-right__footer",
    "footer",
  ];

  blocks.forEach((block) => {
    const blockElement = document.querySelector(`.${block}`);
    const listItems = blockElement.querySelectorAll("ol li");

    if (listItems.length > 0) {
      const savedList = [];

      // Collect list items
      listItems.forEach((item) => {
        savedList.push(item.textContent);
      });

      // Save the list in localStorage
      localStorage.setItem(`${block}-list`, JSON.stringify(savedList));
    }
  });

  alert("Списки збережено для всіх блоків");
});

window.addEventListener("beforeunload", () => {
  const blocks = [
    "header",
    "aside-left",
    "main-section__header",
    "aside-right__content",
    "main-section__content",
    "aside-right__footer",
    "footer",
  ];
  blocks.forEach((block) => {
    localStorage.removeItem(`${block}-list`);
  });
});
