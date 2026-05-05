// 1. Definimos la URL base de la API
const url_api = "https://rickandmortyapi.com/api/character";

// 2. Llamada inicial para cargar los primeros personajes
const response = requestData(url_api);

// 3. Función asíncrona para obtener y renderizar los datos
async function requestData(url_api) {
    // Esperamos a que la petición fetch termine
    const response = await fetch(url_api);
    // Convertimos la respuesta cruda en un objeto JSON usable
    let data = await response.json();
    
    // La API de Rick & Morty devuelve un objeto 'info' con los enlaces a "siguiente" y "anterior"
    let info = data.info;
    
    // Buscamos el botón de "Cargar más" en el HTML
    const button = document.getElementById("loadMore");
    
    // Guardamos las URLs de paginación en atributos 'data' del propio botón
    // Si no hay más páginas (null), guardamos un string vacío
    button.setAttribute("data-next", (info.next == null) ? '' : info.next);
    button.setAttribute("data-prev", (info.prev == null) ? '' : info.prev);

    // Obtenemos cuántos personajes llegaron en esta tanda
    let resultCount = data.results.length;
    // Referencia al elemento <ul> o <div> donde se mostrarán los personajes
    let lista = document.getElementById("character");

    // Recorremos el arreglo de resultados
    for (let index = 0; index < resultCount; index++) {
        let character = data.results[index];
        let name = character.name;
        let gender = character.gender;
        let image = character.image;

        // Inyectamos el HTML de cada personaje en la lista
        lista.innerHTML += `<li>
            <img src="${image}" alt="${name}">
            <h2>${name}</h2>
            <span>${gender}</span>
        </li>`;
        
        console.log(name); // Para verificar en consola
    }
}

// 4. Función para manejar el evento de clic en "Cargar más"
function loadMore() {
    const button = document.getElementById("loadMore");
    // Leemos la URL que guardamos previamente en el atributo 'data-next'
    const next = button.getAttribute("data-next");
    
    // Si la URL existe, volvemos a llamar a la función principal con el nuevo link
    if(next == "" || next == null){
        console.log("No hay más personajes para cargar");
    } else {
        requestData(next);
    }
}

/*¿Qué pasa si quieres cambiar a otra API?
Si decides usar otra API (por ejemplo, la de Pokémon o una de películas), debes tener cuidado porque no todas las APIs tienen la misma estructura. Aquí los puntos clave que tendrías que editar:

1. La estructura de los datos (data)
En este código, se asume que los personajes están dentro de data.results.

El cambio: Algunas APIs devuelven directamente una lista data, o usan otros nombres como data.items o data.data.

2. La Paginación (data.info)
Este código depende de que la API te entregue un objeto info con next y prev.

El cambio: Muchas APIs no funcionan así. Algunas usan un sistema de "offset" y "limit" en la URL (ej: ?limit=20&offset=20). Tendrías que reescribir la lógica de cómo el botón obtiene la siguiente página.

3. Los nombres de las propiedades
Aquí usas character.name, character.gender y character.image.

El cambio: Si usas la API de Pokémon, por ejemplo, la imagen no está en .image, sino en algo más complejo como .sprites.front_default. Siempre debes revisar el JSON que devuelve la nueva API en la consola (console.log(data)).

4. Limpieza de la lista
Actualmente usas lista.innerHTML += ....

Nota: Esto añade contenido al final. Si quieres que la nueva API reemplace lo anterior en lugar de acumularlo, deberías usar lista.innerHTML = ... (sin el +) o limpiar la lista antes del bucle con lista.innerHTML = "".

Tip de experto: Antes de cambiar el código, abre la nueva URL de la API en tu navegador o usa una herramienta como Postman para ver cómo se llaman exactamente los campos que quieres mostrar.*/