let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return items;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  textElement.textContent = item;
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  deleteButton.addEventListener("click", () => {
    clone.remove();
    items = getTasksFromDOM();
    saveTasks(items);
  });
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItemElement = createItem(itemName);
    listElement.prepend(newItemElement);
    items = getTasksFromDOM();
    saveTasks(items);
  });
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
    textElement.addEventListener("blur", () => {
      textElement.removeAttribute("contenteditable");
      items = getTasksFromDOM();
      saveTasks(items);
    });
  });
  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((itemElement) => {
    tasks.push(itemElement.textContent);
  });
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const newItemText = inputElement.value.trim();
  if (newItemText) {
    const itemElement = createItem(newItemText);
    listElement.prepend(itemElement);
    items = getTasksFromDOM();
    saveTasks(items);
    inputElement.value = "";
  }
});

items = loadTasks();
items.forEach((item) => {
  const itemElement = createItem(item);
  listElement.append(itemElement);
});
