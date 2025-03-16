// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

const amigos = [];
const amigosElegibles = [];

const inputNombreAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');


const agregarAmigo = () => {
  let nombreAmigo = inputNombreAmigo.value.trim();
  if (nombreAmigo) {
    if (amigos.includes(nombreAmigo)) {
      inputNombreAmigo.value = '';
      alert(`Ya existe un amigo llamado ${nombreAmigo}`);
      return;
    }
    amigos.push(nombreAmigo);
    amigosElegibles.push({ nombre: nombreAmigo, elegido: false });
    inputNombreAmigo.value = '';
    actualizarListaAmigos();
  } else {
    alert('Por favor, inserte un nombre');
  }
}


const actualizarListaAmigos = () => {
  listaAmigos.innerHTML = '';
  amigosElegibles.forEach(amigo => {
    const li = document.createElement('li');
    const eliminarButton = createDeleteButton(amigo);
    li.textContent = amigo.nombre;
    li.appendChild(eliminarButton);
    listaAmigos.appendChild(li);
  });
  resultado.innerHTML = '';
}


const sortearAmigos = () => {
  if (amigos.length < 2) {
    mostrarResultado('Se necesitan al menos 2 amigos para sortear.');
    return;
  }

  let asignados;
  let intentos = 100;
  do {
    asignados = [...amigos].sort(() => Math.random() - 0.5);
    intentos--;
    if (intentos === 0) {
      mostrarResultado('No se pudo generar un sorteo válido, intente nuevamente.');
      return;
    }
  } while (asignados.some((a, i) => a === amigos[i]));

  let resultadoTexto = amigos.map((amigo, i) => `${amigo} le da un regalo a ${asignados[i]}`).join('<br>');
  mostrarResultado(resultadoTexto);
  startConfetti();
}


const reiniciarSorteo = () => {
  if (!amigosElegibles.length || amigosElegibles.every(amigo => !amigo.elegido)) {
    return;
  }
  if (window.confirm('¿Está seguro de que desea reiniciar el sorteo?')) {
    amigos.length = 0;
    amigosElegibles.forEach(amigo => {
      amigos.push(amigo.nombre);
      amigo.elegido = false;
    });
    actualizarListaAmigos();
    mostrarResultado('Todos los amigos han sido reiniciados y son elegibles nuevamente.');
  }
}


const mostrarResultado = (mensaje) => {
  resultado.innerHTML = mensaje;
  setTimeout(() => {
    resultado.innerHTML = '';
  }, 5000);
}


const eliminarAmigo = (nombre) => {
  const indiceAmigo = amigos.indexOf(nombre);
  if (indiceAmigo !== -1) {
    if (window.confirm(`¿Está seguro de que desea remover a ${nombre} del sorteo?`)) {
      amigos.splice(indiceAmigo, 1);
      const indiceAmigoElegible = amigosElegibles.findIndex(amigo => amigo.nombre === nombre);
      if (indiceAmigoElegible !== -1) {
        amigosElegibles.splice(indiceAmigoElegible, 1);
      }
      actualizarListaAmigos();
      mostrarResultado(`${nombre} se ha eliminado del sorteo.`);
    }
  } else {
    if (window.confirm(`No se puede eliminar a ${nombre} porque ya se ha sorteado, ¿Desea reiniciar el sorteo?`)) {
      reiniciarSorteo();
    }
  }
}

function createDeleteButton(amigo) {
  const eliminarButton = document.createElement('button');
  const eliminarButtonIcon = document.createElement('img');
  eliminarButtonIcon.src = 'assets/delete.svg';
  eliminarButtonIcon.alt = 'Ícono para eliminar';
  eliminarButton.appendChild(eliminarButtonIcon);
  eliminarButton.onclick = () => eliminarAmigo(amigo.nombre);
  eliminarButton.classList.add('button-eliminar');
  return eliminarButton;
}

function startConfetti() {
  confetti({
    particleCount: 500,
    spread: 75,
    origin: { y: .8 },
    colors: ['#b2aa8e', '#0c1b33', '#7a306c', '#03b5aa', '#dbfe87'],
  });
}
