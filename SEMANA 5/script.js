// Selección de elementos del DOM
const imageUrlInput = document.getElementById('imageUrl');
const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('deleteBtn');
const gallery = document.getElementById('gallery');

let selectedImage = null;

const imageInput = document.getElementById('imageInput');

function addImage() {
    // Obtenemos el archivo seleccionado
    const file = imageInput.files[0];

    if (!file) {
        alert("Por favor, selecciona un archivo de imagen primero.");
        return;
    }

    // Creamos un lector de archivos (FileReader)
    const reader = new FileReader();

    // Este evento se dispara cuando el archivo se termina de leer
    reader.onload = function(e) {
        const newImg = document.createElement('img');
        newImg.src = e.target.result; // Aquí está el contenido de la imagen en formato Base64
        newImg.alt = "Imagen local";

        // Mantenemos la lógica de selección que ya tenías
        newImg.addEventListener('click', function() {
            if (selectedImage) {
                selectedImage.classList.remove('selected');
            }
            this.classList.add('selected');
            selectedImage = this;
        });

        gallery.appendChild(newImg);
        
        // Limpiamos el input para la siguiente subida
        imageInput.value = "";
    };

    // Iniciamos la lectura del archivo como una URL de datos
    reader.readAsDataURL(file);
}


// Función para eliminar imagen seleccionada
function deleteImage() {
    if (selectedImage) {
        gallery.removeChild(selectedImage);
        selectedImage = null; // Limpiar referencia
    } else {
        alert("Selecciona una imagen primero haciendo clic en ella.");
    }
}

// Event Listeners
addBtn.addEventListener('click', addImage);
deleteBtn.addEventListener('click', deleteImage);

// Atajo de teclado: Enter para agregar, Suprimir para borrar
window.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        addImage();
    }
    if (e.key === "Delete" || e.key === "Backspace") {
        deleteImage();
    }
});