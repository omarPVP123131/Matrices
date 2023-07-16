function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function changeBackgroundColor() {
    var body = document.body;
    var currentColor = body.style.backgroundColor;
    var newColor = getRandomColor();
  
    body.style.backgroundColor = newColor;
    setTimeout(function() {
      body.style.backgroundColor = currentColor;
      changeBackgroundColor();
    }, 100);
  }
  
  window.addEventListener("load", function() {
    changeBackgroundColor();
  });

  var filasTotales; // Número total de filas
  var columnas; // Número de columnas
  var filasPorPagina = 100; // Tamaño de página
  var columnasPorPagina = 100; // Tamaño de página
  var paginasTotales; // Número total de páginas
  var paginaActual = 1; // Página actual
  
  function crearMatriz() {
    var tabla = document.getElementById('matriz');
    tabla.innerHTML = '';
  
    var inicioFila = (paginaActual - 1) * filasPorPagina;
    var finFila = Math.min(inicioFila + filasPorPagina, filasTotales);
  
    var inicioColumna = (paginaActual - 1) * columnasPorPagina;
    var finColumna = Math.min(inicioColumna + columnasPorPagina, columnas);
  
    for (var i = inicioFila; i < finFila; i++) {
      var fila = document.createElement('tr');
  
      for (var j = inicioColumna; j < finColumna; j++) {
        var celda = document.createElement('td');
        celda.textContent = Math.floor(Math.random() * 100);
        fila.appendChild(celda);
      }
  
      tabla.appendChild(fila);
    }
  }
  
  function cambiarPagina(pagina) {
    if (pagina >= 1 && pagina <= paginasTotales) {
      paginaActual = pagina;
      crearMatriz();
      actualizarControlesPaginacion();
    }
  }
  
  function actualizarControlesPaginacion() {
    var btnAnterior = document.getElementById('btnAnterior');
    var btnSiguiente = document.getElementById('btnSiguiente');
  
    btnAnterior.disabled = paginaActual === 1;
    btnSiguiente.disabled = paginaActual === paginasTotales;
  
    var paginaActualSpan = document.getElementById('paginaActual');
    paginaActualSpan.textContent = 'Página ' + paginaActual;
  }
  

  document.getElementById('filas').addEventListener('change', function() {
    filasTotales = parseInt(this.value);
    paginasTotales = Math.ceil(filasTotales / filasPorPagina);
  });
  
  document.getElementById('columnas').addEventListener('change', function() {
    columnas = parseInt(this.value);
  });
  
  document.getElementById('btnAnterior').addEventListener('click', function() {
    cambiarPagina(paginaActual - 0);
  });
  
  document.getElementById('btnSiguiente').addEventListener('click', function() {
    cambiarPagina(paginaActual + 0);
  });
  
  actualizarControlesPaginacion();
  
  function validarNumero(event) {
    var input = event.target;
    var valor = input.value;
  
    var numero = valor.replace(/[^0-9]/g, '');
  
    input.value = numero;
  }