var selectedRow = null;

// Funcion para mostrar alerta de la accion seleccionada
function showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(()=>document.querySelector(".alert").remove(),2000);
}

// Agregar Datos
document.querySelector("#task-form").addEventListener("submit", (e)=>{
    e.preventDefault();

    // Tomando los valores del formulario
    const tarea = document.querySelector("#tarea").value;
    const descripcion = document.querySelector("#descripcion").value;

    // Validando
    if(tarea == "" || descripcion == "" ){
        showAlert("Por favor ingrese todos los datos", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#lista-tareas");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${tarea}</td>
                <td>${descripcion}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
                <a href="#" class="btn btn-danger btn-sm delete">Borrar</a>
                <a href="#" class="btn btn-info btn-sm complete">Completada</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Tarea agregada", "success")
        }
        else{
           selectedRow.children[0].textContent = tarea; 
           selectedRow.children[1].textContent = descripcion; 
           selectedRow = null;
           showAlert("Tarea editada", "info")
        }

        clearFields();
    }
});

// Editar datos
document.querySelector("#lista-tareas").addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#tarea").value = selectedRow.children[0].textContent;
        document.querySelector("#descripcion").value = selectedRow.children[1].textContent;
    }
});

// Borrar Datos
document.querySelector("#lista-tareas").addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Tarea borrada", "danger")
        clearFields();
    }
})

// Completada
document.querySelector("#lista-tareas").addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("complete")){
        let btncomp = document.querySelector(".complete");
        
        target.btncomp.remove();
        showAlert("Tarea completada", "info")
        clearFields();
    }
})

// Limpiar todos los campos
function clearFields(){
    document.querySelector("#tarea").value = "";
    document.querySelector("#descripcion").value = "";
}
