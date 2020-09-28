console.log("check API");

const url = "https://wincacademydatabase.firebaseio.com/gregor/tasks.json";

// get request

const getTaskList = async () => {
  try {
    const data = await fetch(url, { method: "GET" });
    return await data.json();
  } catch (error) {
    console.log(error);
  }
};
console.log("Before ", getTaskList());

// conversion

const result = async () => {
  const res = await getTaskList();
  let tasks = Object.keys(await res).map((key) => ({
    id: key,
    description: res[key].description,
    done: res[key].done,
  }));
  console.log("After ", tasks);
  return tasks;
};

// post request

const postTask = async (data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

// delete request

const deleteTask = async (id) => {
  const response = await fetch(
    "https://wincacademydatabase.firebaseio.com/gregor/tasks/" + id + ".json",
    { method: "DELETE" }
  );
  taskList.innerHTML = "";
  apiToDom();
  return response.json();
};

// put request

const putTask = async (id, data, state) => {
  const response = await fetch(
    "https://wincacademydatabase.firebaseio.com/gregor/tasks/" + id + ".json",
    { method: "PUT", body: JSON.stringify({ description: data, done: state }) }
  );
  taskList.innerHTML = "";
  await apiToDom();
  return response.json();
};
