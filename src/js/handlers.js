// 3. Додавання завдань:

import { nanoid } from 'nanoid';
import { refs } from './refs';
import localStorageApi from './local-storage-api';
import { renderTasks } from './render-tasks';

// Після натискання кнопки "Add" завдання має бути додано до списку.

// Картка кожного завдання має містити кнопку "Delete", щоб можна було видаляти завдання.
// Перевірка: користувач не може додавати порожні завдання.
// Після додавання завдання поле вводу має очищатися.

export function onFormSubmit(event) {
  event.preventDefault();
  const { taskName, taskDescription } = event.target.elements;
  const name = taskName.value.trim();
  const description = taskDescription.value.trim();

  if (!name || !description) {
    return alert('Не всі поля заповненні!!!!');
  }
  const task = {
    name,
    description,
    id: nanoid(),
  };

  localStorageApi.saveTasks(task);
  const tasks = localStorageApi.getTasks();
  renderTasks(tasks);
  event.target.reset();
}

export function onTaskDelete(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const taskId = event.target.dataset.id;
  localStorageApi.deleteTask(taskId);
  const tasks = localStorageApi.getTasks();
  renderTasks(tasks);
}
