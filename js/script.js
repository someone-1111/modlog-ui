let descriptionMap = {
  'addremovalreason': 'Añadir razón de eliminación',
  'acceptmoderatorinvite': 'Invitación a la moderación aceptada.',
  'approvecomment': 'Comentario aprobado.',
  'approvelink': 'Publicación aprobada.',
  'banuser': 'Usuario(a) baneado(a).',
  'distinguishcomment': 'Comentario de moderador distinguido.',
  'distinguishpost': 'Publicación distinguida.',
  'editflair': 'Etiqueta de publicación editada.',
  'ignorereports': 'Reportes ignorados',
  'ignorereportscomment': 'Reportes del comentario de ignorados.',
  'ignorereportspost': 'Reportes de publicación ignorados.',
  'invitemoderator': 'Usuario(a) invitado(a) a la moderación.',
  'lock': 'Comentarios de publicación bloqueados.',
  'marknsfw': 'Publicación marcada como NSFW.',
  'markoriginalcontent': 'Publicación marcada como OC (Original Content)',
  'removecomment': 'Comentario eliminado.',
  'removelink': 'Publicación eliminada.',
  'removelinkauto': 'Publicación automáticamente eliminada.',
  'removemoderator': 'Usuario(a) removido de la moderación.',
  'setsuggestedsort': 'Se cambió el orden predeterminado de una publicación.',
  'spamcomment': 'Comentario eliminado por spam.',
  'spamlinkcomment': 'Comentario eliminado por spam.',
  'spamlink': 'Publicación eliminada por spam.',
  'sticky': 'Fijado',
  'stickycomment': 'Comentario de moderador fijado.',
  'stickydistinguishcomment': 'Comentario de moderador fijado y distinguido.',
  'stickydistinguishpost': 'Publicación fijada y distinguida.',
  'stickypost': 'Publicación fijada.',
  'tempbanend': 'Fin del ban temporal.',
  'unbanuser': 'Usuario(a) desbaneado(a).',
  'unignorereports': 'Ignorado de reportes revertido',
  'unignorereportscomment': 'Ignorado de reportes del comentario de {author} revertido.',
  'unignorereportspost': 'Ignorado de reportes de publicación revertido.',
  'unlock': 'Publicación desbloqueada',
  'unmuteuser': 'Usuario ahora puede enviar mensajes por modmail.',
  'unspoiler': 'Publicación desmarcada como spoiler.',
  'unsticky': ' Fijado quitado',
  'unstickycomment': 'Fijado de comentario {author} quitado.',
  'unstickypost': 'Fijado de publicación quitado.',
  'wikipermlevel': 'Nivel de permisos de wiki modificado',
  'wikirevise': 'Página de la wiki modificada',
};

const btn = document.getElementById('btn-toggle-dark');

if (localStorage.getItem('modoOscuro') === 'true') {
  document.body.classList.add('dark-mode');
  btn.textContent = '🌞';
}


// Botón modo oscuro
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const modoOscuroActivo = document.body.classList.contains('dark-mode');
  localStorage.setItem('modoOscuro', modoOscuroActivo);

  btn.textContent = modoOscuroActivo ? '🌞' : '🌙';
});


const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', () => {
  reiniciarCarga()
  cargarDatos(true);

});

function replaceGiphyMarkdown(mdText) {
  return mdText.replace(/!\[([^\]]*)\]\(giphy\|([^\)]+)\)/g, (match, alt, id) => {
    return `![${alt}](https://i.giphy.com/${id}.gif)`;
  });
}

const etiquetas = {
  action: "Acción",
  mod: "Moderador",
  target_author: "Usuario",
  created_utc: "Fecha",
  details: "Detalle",
  description: "Descripción",
  target_permalink: "Enlace",
  body: "Contenido",
  target_title: "Titulo",
  id: "ID"
};

let pagina = 1, porPagina = 25, isLoading = false, hasMore = true, contador = 0;
let debounceTimer, lastRequestTime = 0;

const url = "https://test-logs2.onrender.com/api/logs";
const loader = document.getElementById("loader");
const autorInput = document.getElementById("autor");
const moderadorInput = document.getElementById("moderador");
const accionSelect = document.getElementById("accion");
const endMessage = document.getElementById("endMessage");
const sentinela = document.getElementById("sentinela");
const tbody = document.querySelector("#tablaLogs tbody");
const totalResultadosEl = document.getElementById("totalResultados");
const errorMsg = document.getElementById("errorMsg");


const MAX_INPUT_LENGTH = 32;

[autorInput, moderadorInput].forEach(input => {
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    // Validar longitud antes de hacer la petición
    if (input.value.length > MAX_INPUT_LENGTH) {
      if (errorMsg) {
        errorMsg.textContent = "El texto es demasiado largo (máx. 32 caracteres)";
        errorMsg.style.display = "block";
      }
      return; // No ejecuta reiniciarCarga ni hace petición
    } else {
      if (errorMsg) errorMsg.style.display = "none";
    }

    debounceTimer = setTimeout(reiniciarCarga, 500);
  });
});



accionSelect.addEventListener("change", reiniciarCarga);
document.getElementById("btnReset").addEventListener("click", () => {
  autorInput.value = "";
  moderadorInput.value = "";
  accionSelect.selectedIndex = 0;
  reiniciarCarga();
});

function reiniciarCarga() {
  pagina = 1; contador = 0; hasMore = true;
  tbody.innerHTML = "";
  endMessage.style.display = "none";
  errorMsg.style.display = "none";
  cargarDatos(false);
}

async function poblarSelectAcciones() {
  try {
    const resp = await fetch("https://test-logs2.onrender.com/api/actions");
    const data = await resp.json();
    if (resp.ok && Array.isArray(data.actions)) {
      accionSelect.innerHTML = '<option value="">Todas</option>';
      data.actions.forEach(accion => {
        const opt = document.createElement("option");
        opt.value = accion; opt.textContent = accion;
        accionSelect.appendChild(opt);
      });
    }
  } catch { }
}
function renderMarkdown(md) {
  return DOMPurify.sanitize(marked.parse(md || ''));
}

//cerrar modal: click fuera del modal
const modal2 = document.getElementById("miModal");
window.addEventListener("click", e => {
  if (e.target === modal2) {
    modal2.style.display = "none";
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal2.style.display === "block") {
    modal2.style.display = "none";
  }
});

function generarFila(clave, valorFormateado) {
  const etiqueta = etiquetas[clave] || clave;
  return `<tr><td style="font-weight: bold; padding: 6px; border: 1px solid #ccc; background:#f0f0f0">${etiqueta}</td><td style="padding: 6px; border: 1px solid #ccc;">${valorFormateado}</td></tr>`;
}

function formatearValor(clave, valor) {
  if (clave === "created_utc") return new Date(valor * 1000).toLocaleString();
  if (clave === "target_author") return `<a class="sin-estilo" href="https://reddit.com/user/${valor}" target="_blank">${valor}</a>`;
  if (clave === "target_permalink" && typeof valor === "string") return `<a href="https://reddit.com${valor}" target="_blank">${"https://reddit.com" + valor}</a>`;
  if (typeof valor === "object" && valor !== null) return JSON.stringify(valor, null, 2);
  return valor ?? "N/A";
}

let currentController = null;

async function cargarDatos(append = false) {

  const ignoreMods = document.getElementById("ignorarModsCheckbox").checked;

  // Cancelar petición anterior si aun esta en curso
  if (currentController) currentController.abort();
  currentController = new AbortController();
  const signal = currentController.signal;

  const params = new URLSearchParams();
  params.append("page", pagina);
  params.append("ignore_mods", ignoreMods ? "true" : "false");
  if (autorInput.value.trim()) params.append("author", autorInput.value.trim());
  if (moderadorInput.value.trim()) params.append("mod", moderadorInput.value.trim());
  if (accionSelect.value) params.append("action", accionSelect.value);


  isLoading = true;
  loader.style.display = "block";
  const url2 = new URL(url);
  url2.search = params.toString();
  let largo = 0;

  try {
    const resp = await fetch(url2.toString(), { signal });

    let data = null;
    try {
      data = await resp.json();
    } catch (e) {
      // Si no es JSON, data queda null
    }

    if (!resp.ok) {
      let msg = resp.statusText;
      if (data && data.error) msg = data.error;
      if (errorMsg) {
        errorMsg.textContent = msg;
        errorMsg.style.display = "block";
      }
      console.error(`Error ${resp.status}: ${msg}`);
      return;
    }
    if (errorMsg) errorMsg.style.display = "none";

    // Aquí ya tienes data disponible para usar
    if (!append) {
      tbody.innerHTML = "";
      contador = 0;
    }

    const frag = document.createDocumentFragment();
    console.log("cantidad en data:" + data.results.length);
    largo = data.results.length;
    

    data.results.forEach(item => {
      const tr = document.createElement("tr");

      // Columna: acción
      const tdAction = document.createElement("td");
      // tdAction.textContent = item.action || "";

      const tooltipAction = document.createElement("span");
      tooltipAction.classList.add("tooltip");
      tooltipAction.textContent = item.action || "";
      const tooltipTextAction = document.createElement("span");
      tooltipTextAction.classList.add("tooltiptext");
      tooltipTextAction.textContent = descriptionMap[item.action] || "";
      tooltipAction.appendChild(tooltipTextAction);
      tdAction.appendChild(tooltipAction);
        tr.appendChild(tdAction);

      // Columna: autor con enlace
      const tdAuthor = document.createElement("td");
      if (item.target_author) {
        const a = document.createElement("a");
        a.href = `https://reddit.com/user/${encodeURIComponent(item.target_author)}`;
        a.textContent = item.target_author;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        tdAuthor.appendChild(a);
        a.classList.add("sin-estilo");
      } else {
        tdAuthor.textContent = "";
      }
      tr.appendChild(tdAuthor);

      // Columna: moderador

      const tdMod = document.createElement("td");
      tdMod.textContent = item.mod || "";
      tr.appendChild(tdMod);

      // Columna: fecha
      const tdDate = document.createElement("td");
      tdDate.textContent = item.created_utc
        ? new Date(item.created_utc * 1000).toLocaleString("en-GB")
        : "";
      tr.appendChild(tdDate);

      // Columna: botón "Más"
      const tdButton = document.createElement("td");
      const btn = document.createElement("button");
      btn.textContent = "Ver detalles";
      btn.type = "button";
      btn.addEventListener("click", () => abrirModalSeguro(item));
      tdButton.appendChild(btn);
      tr.appendChild(tdButton);

      frag.appendChild(tr);
      //contador++;

      const tdLink = document.createElement("td");
      if (item.target_permalink) {
        const a = document.createElement("a");
        a.href = "https://reddit.com" + item.target_permalink;
        a.textContent = "Link";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        tdLink.appendChild(a);
      } else {
        tdLink.textContent = "";
      }
      tr.appendChild(tdLink);
    });


    tbody.appendChild(frag);

    hasMore = data.results.length > 0;
    pagina++;

  } catch (err) {
    if (err.name !== "AbortError") {
      console.error("Error en cargarDatos:", err);
    }
    contador++;
  } finally {
    isLoading = false;
    loader.style.display = "none";

    if (largo === 0) {
      endMessage.style.display = "block";
    } else {
      endMessage.style.display = "none";
    }
    contador++;
  }
}
function abrirModalSeguro(item) {
  const modal = document.getElementById("miModal");
  console.log(modal);
  const modalBody = modal.querySelector(".modal-content");
  modalBody.innerHTML = ""; // limpiar contenido anterior



  const div1 = document.createElement("div");
  div1.setAttribute("id", "test");
  div1.style.overflowX = "auto";
  div1.style.marginBottom = "1rem";
  modalBody.appendChild(div1);

  const cerrar = document.createElement("span");
  cerrar.innerHTML = "&times;";
  cerrar.classList.add("cerrar");
  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modalBody.appendChild(cerrar);
  const tituloModal = document.createElement("h2");
  tituloModal.textContent = "Detalles del Log";
  modalBody.appendChild(tituloModal);
  const tabla = document.createElement("table");
  tabla.style.width = "100%";
  tabla.style.borderCollapse = "collapse";
  // Autor

  if (item.target_author) {
    const tr = document.createElement("tr");
    const tdClave = document.createElement("td");
    const tdValor = document.createElement("td");
    tdClave.classList.add("tdModalClave");
    tdValor.classList.add("tdModalValor");
    tdClave.textContent = `Autor`;
    tdValor.textContent = `${item.target_author || ""}`;
    tr.appendChild(tdClave);
    tr.appendChild(tdValor);
    tabla.appendChild(tr);
    div1.appendChild(tabla);
  }
  // Accion

  if (item.action) {
    const trAccion = document.createElement("tr");
    const tdAccionClave = document.createElement("td");
    const tdAccionValor = document.createElement("td");
    tdAccionClave.classList.add("tdModalClave");
    tdAccionValor.classList.add("tdModalValor");
    tdAccionClave.textContent = `Accion`;
    tdAccionValor.textContent = `${item.action || ""}` + ": " + (descriptionMap[item.action] || "");
    trAccion.appendChild(tdAccionClave);
    trAccion.appendChild(tdAccionValor);
    tabla.appendChild(trAccion);
    modalBody.appendChild(tabla);
  }
  // Fecha

  if (item.created_utc) {

    const trFecha = document.createElement("tr");
    const tdFechaClave = document.createElement("td");
    const tdFechaValor = document.createElement("td");
    tdFechaClave.classList.add("tdModalClave");
    tdFechaValor.classList.add("tdModalValor");
    tdFechaClave.textContent = `Fecha`;
    tdFechaValor.textContent = `${item.created_utc
      ? new Date(item.created_utc * 1000).toLocaleString("en-GB")
      : ""
      }`;
    trFecha.appendChild(tdFechaClave);
    trFecha.appendChild(tdFechaValor);
    tabla.appendChild(trFecha);
    modalBody.appendChild(tabla);
  }

  // Moderador

  if (item.mod) {
    const trMod = document.createElement("tr");
    const tdModClave = document.createElement("td");
    const tdModValor = document.createElement("td");
    tdModClave.classList.add("tdModalClave");
    tdModValor.classList.add("tdModalValor");
    tdModClave.textContent = `Mod`;
    tdModValor.textContent = `${item.mod || ""}`;
    trMod.appendChild(tdModClave);
    trMod.appendChild(tdModValor);
    tabla.appendChild(trMod);
    modalBody.appendChild(tabla);
  }

  // Detalle

  if (item.details) {
    const trDetalle = document.createElement("tr");
    const tdDetalleClave = document.createElement("td");
    const tdDetalleValor = document.createElement("td");
    tdDetalleClave.classList.add("tdModalClave");
    tdDetalleValor.classList.add("tdModalValor");
    tdDetalleClave.textContent = `Detalle`;
    tdDetalleValor.textContent = `${item.details || ""}`;
    trDetalle.appendChild(tdDetalleClave);
    trDetalle.appendChild(tdDetalleValor);
    tabla.appendChild(trDetalle);
    modalBody.appendChild(tabla);
  }

  // Titulo

  if (item.target_title) {
    const trTitle = document.createElement("tr");
    const tdTitleClave = document.createElement("td");
    const tdTitleValor = document.createElement("td");
    tdTitleClave.classList.add("tdModalClave");
    tdTitleValor.classList.add("tdModalValor");
    tdTitleClave.textContent = `Titulo`;
    tdTitleValor.textContent = `${item.target_title || ""}`;
    trTitle.appendChild(tdTitleClave);
    trTitle.appendChild(tdTitleValor);
    tabla.appendChild(trTitle);
    modalBody.appendChild(tabla);
  }

  // Descripcion

  if (item.description) {
    const trDescripcion = document.createElement("tr");
    const tdDescripcionClave = document.createElement("td");
    const tdDescripcionValor = document.createElement("td");
    tdDescripcionClave.classList.add("tdModalClave");
    tdDescripcionValor.classList.add("tdModalValor");
    tdDescripcionClave.textContent = `Descripcion`;
    tdDescripcionValor.textContent = `${item.description || ""}`;
    trDescripcion.appendChild(tdDescripcionClave);
    trDescripcion.appendChild(tdDescripcionValor);
    tabla.appendChild(trDescripcion);
    modalBody.appendChild(tabla);
  }

  // Permalink

  if (item.target_permalink) {
    const trPermalink = document.createElement("tr");
    const tdPermalinkClave = document.createElement("td");
    const tdPermalinkValor = document.createElement("td");
    tdPermalinkClave.classList.add("tdModalClave");
    tdPermalinkValor.classList.add("tdModalValor");
    //const pPermalink2 = document.createElement("p");
    tdPermalinkClave.textContent = `Enlace`;
    const base = "https://reddit.com"
    const urlCompleta = base + item.target_permalink;
    const pPermalink3 = document.createElement("a");
    pPermalink3.href = urlCompleta;
    pPermalink3.textContent = urlCompleta;
    pPermalink3.target = "_blank";
    pPermalink3.rel = "noopener noreferrer";
    tdPermalinkValor.appendChild(pPermalink3);
    trPermalink.appendChild(tdPermalinkClave);
    trPermalink.appendChild(tdPermalinkValor);
    tabla.appendChild(trPermalink);
    modalBody.appendChild(tabla);
  }
  // Texto (body)
  if (item.target_body) {
    const tituloh3 = document.createElement("h3");
    tituloh3.textContent = "Contenido";
    modalBody.appendChild(tituloh3);

    const div2 = document.createElement("div");
    div2.setAttribute("id", "div2");

    const texto2 = item.target_body;
    const regex1 = /!\[gif\]\(giphy\|(\w+)(?:\|.+)?\)/g;
    const textoModificado = replaceGiphyMarkdown(texto2);

    const html = marked.parse(textoModificado || "");
    div2.textContent = texto2;

    modalBody.appendChild(div2);
  }
  modal.style.display = "block";
}

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !isLoading && hasMore) {
    cargarDatos(true);
  }
}, { rootMargin: "200px" });

const botonForzar = document.querySelector('#botonForzar');
botonForzar.addEventListener('click', () => {
  if (!isLoading && hasMore) {
    cargarDatos(true);
  }
});

observer.observe(sentinela);
poblarSelectAcciones();
cargarDatos(false);