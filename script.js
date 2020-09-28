console.log("check script");

// Post Tasks

const btnAdd = document.getElementById("btn_add");
const newTask = document.getElementById("new_task");
btnAdd.addEventListener("click", function () {
  postTask({ description: newTask.value, done: false }).then((data) => {
    console.log(data);
  });
  alert("Natuurlijk nog een taak, want jij bent zo een go getter!");
  console.log(newTask.value);
  apiToDom();
});

// Get Tasks + Delete Tasks + Put Task

const taskList = document.getElementById("task_list_tasks");

const apiToDom = async () => {
  taskList.innerHTML = "";
  const respons = await result();
  for (i = 0; i < respons.length; i++) {
    const liTag = document.createElement("li");
    const imgTag = document.createElement("img");
    const checkbox = document.createElement("input");
    const pTag = document.createElement("p");
    imgTag.addEventListener("click", function () {
      deleteTask(liTag.id);
      console.log(liTag.id);
      alert(
        "Ja hoor, verwijder het maar. We wisten toch al beide dat jij het niet ging doen!"
      );
    });
    checkbox.addEventListener("click", function () {
      if (liTag.className != "gedaan") {
        putTask(liTag.id, pTag.innerHTML, true);
        alert("Hoe heb je dit vanaf de bank kunnen doen?");
      } else {
        liTag.className = "";
        putTask(liTag.id, pTag.innerHTML, false);
        alert(
          "Wat fijn dat ik gelijk had, maar ga je nog wat doen vandaag of niet?"
        );
      }
    });
    checkbox.type = "checkbox";
    pTag.innerHTML = respons[i].description;
    liTag.append(checkbox);
    liTag.append(pTag);
    imgTag.src = "waste-management.jpg";
    liTag.id = respons[i].id;
    liTag.append(imgTag);
    taskList.append(liTag);
    if (respons[i].done == true) {
      liTag.className = "gedaan";
      checkbox.checked = true;
    }
  }
};

apiToDom();
