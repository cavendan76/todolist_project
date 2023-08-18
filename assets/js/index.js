const tareas = [
  {
    id: 10001,
    tarea: "llenar formularios",
    estado: "",
  },
  {
    id: 10002,
    tarea: "buscar alojamiento",
    estado: "",
  },
  {
    id: 10003,
    tarea: "recorrer la ciudad",
    estado: "",
  },
];

const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const cuentaTareas = document.querySelector("#cuenta-tareas");
const tareasRealizadas = document.querySelector("#tareas-hechas");
const tbody = document.getElementById("tbody");
let idTarea = 10004;

function llenaTarea() {
  const tarea = tareaInput.value;
  if (tarea == "" || tarea == undefined) {
    alert(`Debe ingresar un nombre de tarea...`);
  } else {
    const estado = "";
    tareas.push({ id: idTarea, tarea: tarea, estado: estado });
    tareaInput.value = "";
    idTarea = idTarea + 1;
  }
  buscarRealizadas(tareas);
  listaTareas(tareas);
}

function buscarRealizadas(tareas) {
  let cont = 0;
  for (let tarea of tareas) {
    if (tarea.estado != "") {
      cont = cont + 1;
    }
  }
  tareasRealizadas.textContent = `Realizadas: ${cont}`;
}

function listaTareas(tareas) {
  let html = "";

  for (let tarea of tareas) {
    html += `        
  <tr>
  <th scope="row">${((tarea.id).toString()).slice(-5)}</th>
  <td>${tarea.tarea}</td>
  <td><input class="form-check-input" type="checkbox" id="id${tarea.id}" ${tarea.estado} onclick="modEstadoTarea(${tarea.id})"></td>
  <td><button class="btn btn-danger btn-sm" onclick="borraTarea(${tarea.id})">X</button></td>
  </tr>
  `;
  }
  tbody.innerHTML = html;
  cuentaTareas.textContent = `Total: ${tareas.length}`;
}

function modEstadoTarea(id) {
  const index = tareas.findIndex((tareas) => tareas.id === id);
  if (tareas[index].estado == "checked") {
    tareas[index].estado = "";
  } else {
    tareas[index].estado = "checked";
  }
  buscarRealizadas(tareas);
  listaTareas(tareas);
}

function borraTarea(id) {
  const index = tareas.findIndex((tareas) => tareas.id === id);
  tareas.splice(index, 1);
  buscarRealizadas(tareas);
  listaTareas(tareas);
}

window.onload = listaTareas(tareas);
btnAgregar.addEventListener("click", () => llenaTarea());
