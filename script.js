/* Custom Dragula JS */
const drake = dragula([
	document.getElementById("to-do"),
	document.getElementById("doing"),
	document.getElementById("done"),
	document.getElementById("trash")
]);

drake.on("drag", function (el) {
	el.className = el.className.replace("ex-moved", "");
})
.on("drop", function (el) {
	el.className += " ex-moved";
	saveTasksToLocalStorage(); // Сохраняем задачи в localStorage после перемещения
})
.on("over", function (el, container) {
	container.className += " ex-over";
})
.on("out", function (el, container) {
	container.className = container.className.replace("ex-over", "");
});

/* Vanilla JS to add a new task */
function addTask() {
	/* Get task text from input */
	var inputTask = document.getElementById("taskText").value;
	if (inputTask.trim() === "") return; // Проверка на пустую строку

	/* Add task to the 'To Do' column */
	document.getElementById("to-do").innerHTML +=
		"<li class='task'><p>" + inputTask + "</p></li>";

	/* Save tasks to localStorage */
	saveTasksToLocalStorage();

	/* Clear task text from input after adding task */
	document.getElementById("taskText").value = "";
}

/* Vanilla JS to delete tasks in 'Trash' column */
function emptyTrash() {
	/* Clear tasks from 'Trash' column */
	document.getElementById("trash").innerHTML = "";

	/* Save tasks to localStorage */
	saveTasksToLocalStorage();
}

/* Save tasks in all columns to localStorage */
function saveTasksToLocalStorage() {
	const columns = ["to-do", "doing", "done", "trash"];
	const tasks = {};

	columns.forEach((columnId) => {
		const column = document.getElementById(columnId);
		tasks[columnId] = Array.from(column.children).map(task => task.innerHTML);
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Load tasks from localStorage */
function loadTasksFromLocalStorage() {
	const savedTasks = JSON.parse(localStorage.getItem("tasks"));
	if (!savedTasks) return;

	Object.keys(savedTasks).forEach((columnId) => {
		const column = document.getElementById(columnId);
		column.innerHTML = savedTasks[columnId]
			.map(taskContent => `<li class='task'>${taskContent}</li>`)
			.join("");
	});
}

/* Load tasks when the page loads */
window.onload = function () {
	loadTasksFromLocalStorage();
};
