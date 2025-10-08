let descriptionMap = {
  'addremovalreason': 'Añadir razón de eliminación',
  'acceptmoderatorinvite': 'Invitación a la moderación aceptada.',
  'approvecomment': 'Comentario aprobado.',
  'approvelink': 'Publicación aprobada.',
  'banuser': 'Usuario(a) baneado(a).',
  'distinguishcomment': 'Comentario de moderador distinguido.',
  'distinguish': 'Publicación o comentario distinguido.',
  'editflair': 'Etiqueta de publicación editada.',
  'ignorereports': 'Reportes ignorados',
  'ignorereportscomment': 'Reportes del comentario de ignorados.',
  'ignorereportspost': 'Reportes de publicación ignorados.',
  'invitemoderator': 'Usuario(a) invitado(a) a la moderación.',
  'lock': 'Comentarios de publicación bloqueados.',
  'marknsfw': 'Publicación marcada como NSFW.',
  'markoriginalcontent': 'Publicación marcada como OC (Original Content)',
  'muteuser': 'Usuario(a) ya no puede enviar mensajes por modmail',
  'removecomment': 'Comentario eliminado.',
  'removelink': 'Publicación eliminada.',
  'removelinkauto': 'Publicación automáticamente eliminada.',
  'removemoderator': 'Usuario(a) removido de la moderación.',
  'setsuggestedsort': 'Se cambió el orden predeterminado de una publicación.',
  'spamcomment': 'Comentario eliminado por spam.',
  'spamlinkcomment': 'Comentario eliminado por spam.',
  'spamlink': 'Publicación eliminada por spam.',
  'spoiler': 'Publicación marcada como Spoiler',
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

/* let iconMap = {
  'addremovalreason': 'remove_circle_outline',
  'acceptmoderatorinvite': 'how_to_reg',
  'approvecomment': 'check_circle',
  'approvelink': 'check_circle',
  'banuser': 'block',
  'distinguishcomment': 'star',
  'distinguishpost': 'star',
  'editflair': 'edit',
  'ignorereports': 'visibility_off',
  'invitemoderator': 'person_add',
  'lock': 'lock',
  'marknsfw': 'warning',
  'markoriginalcontent': 'copyright',
  'removecomment': 'delete',
  'removelink': 'delete',
  'removelinkauto': 'delete_forever',
  'removemoderator': 'person_remove',
  'setsuggestedsort': 'sort',
  'spamcomment': 'report',
  'spamlinkcomment': 'report',
  'spamlink': 'report',
  'sticky': 'push_pin',
  'stickycomment': 'push_pin',
  'stickydistinguishcomment': 'star',
  'stickydistinguishpost': 'star',
  'stickypost': 'push_pin',
  'tempbanend': 'timer_off',
  'unbanuser': 'lock_open',
  'unignorereports': 'visibility',
  'unlock': 'lock_open',
  'unmuteuser': 'volume_up',
  'unspoiler': 'visibility',
  'unsticky': 'push_pin',
  'unstickycomment': 'push_pin',
  'unstickypost': 'push_pin',
  'wikipermlevel': 'security',
  'wikirevise': 'edit',
}; */

let iconMap = {
    'addremovalreason':'receipt',
    'acceptmoderatorinvite': 'how_to_reg',
    'approvecomment': 'add_comment',
    'approvelink': 'done_all',
    'banuser': 'gavel',
    'community_widgets': 'border_color',
    'distinguish': 'star',
    'distinguishpost': 'star',
    'editflair': 'rate_review',
    'ignorereports': 'report_off',
    'invitemoderator': 'contact_mail',
    'lock': 'lock',
    'marknsfw': 'no_adult_content',
    'markoriginalcontent': 'folder_special',
    'muteuser': 'mic_off',
    'removecomment': 'speaker_notes_off',
    'removelink': 'delete',
    'removelinkauto': 'delete',
    'removemoderator': 'sentiment_very_dissatisfied',
    'setsuggestedsort': 'sort',
    'spamcomment': 'report',
    'spamlinkcomment': 'delete_outline',
    'spamlinkpost': 'delete_sweep',
    'sticky':'push_pin',
    'stickycomment': 'location_on',
    'stickydistinguishcomment': 'local_activity',
    'stickydistinguishpost': 'folder_special',
    'stickypost': 'pin_drop',
    'tempbanend': 'how_to_reg',
    'unbanuser': 'how_to_reg',
    'unignorereportscomment': 'assignment_turned_in',
    'unignorereportspost': 'assignment_turned_in',
    'unmuteuser': 'mic',
    'unlock': 'lock_open',
    'unspoiler': 'visibility',
    'unstickycomment': 'location_off',
    'unstickypost': 'location_off',
    'wikipermlevel': 'perm_contact_calendar',
    'wikirevise': 'description'
  };


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
const urlSearch = "https://test-logs2.onrender.com/api/search-comment";
const urlSearchPost = "https://test-logs2.onrender.com/api/search-link";
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


function generarFila(clave, valorFormateado) {
  const etiqueta = etiquetas[clave] || clave;
  return `<tr><td style="font-weight: bold; padding: 6px;  background:#f0f0f0">${etiqueta}</td><td style="padding: 6px; ">${valorFormateado}</td></tr>`;
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
      tr._item = item; // Guarda el item en la fila para acceso global

      // Columna: icono
      const tdIcon = document.createElement("td");
      tdIcon.style.width = "36px";
      tdIcon.style.textAlign = "center";
      tdIcon.style.verticalAlign = "middle";
      tdIcon.style.borderRight = "0px";
      const iconName = iconMap[item.action] || "help_outline";
      const iconSpan = document.createElement("span");
      iconSpan.className = "material-icons";
      iconSpan.textContent = iconName;
      iconSpan.style.fontSize = "22px";
      iconSpan.style
      // iconSpan.style.color = "#4ea1ff";
      tdIcon.appendChild(iconSpan);
      tr.appendChild(tdIcon);

      // Columna: acción (solo texto y tooltip)
      const tdAction = document.createElement("td");
      tdAction.style.textAlign = "center";
      tdAction.style.verticalAlign = "middle";
      tdAction.style.borderLeft = "0px";
      const actionText = document.createElement("span");
      actionText.textContent = item.action || "";
      const tooltipTextAction = document.createElement("span");
      tooltipTextAction.classList.add("tooltiptext");
      tooltipTextAction.textContent = descriptionMap[item.action] || "";
      const tooltipAction = document.createElement("span");
      tooltipAction.classList.add("tooltip");
      tooltipAction.appendChild(actionText);
      tooltipAction.appendChild(tooltipTextAction);
      tdAction.appendChild(tooltipAction);
      tr.appendChild(tdAction);

      // Columna: autor con enlace
      const tdAuthor = document.createElement("td");
      if (item.target_author) {
        const enlace = document.createElement("a");
        enlace.className = "sin-estilo";
        enlace.href = "https://www.reddit.com/user/" + item.target_author;
        enlace.target = "_blank";
        enlace.textContent = item.target_author;
        tdAuthor.appendChild(enlace);
      } else {
        tdAuthor.textContent = "";
      }
      tr.appendChild(tdAuthor);

      // Columna: moderador
      const tdMod = document.createElement("td");
      tdMod.textContent = item.mod || "";
      tr.appendChild(tdMod);

      // Columna: fecha
      const tdFecha = document.createElement("td");
      tdFecha.textContent = item.created_utc ? new Date(item.created_utc * 1000).toLocaleString("en-GB") : "";
      tr.appendChild(tdFecha);

      // Columna: botón "Más"
      const tdMas = document.createElement("td");
      const btnMas = document.createElement("button");
      btnMas.textContent = "Ver detalles";
      btnMas.addEventListener("click", () => toggleDetalleFila(tr, item));
      tdMas.appendChild(btnMas);
      tr.appendChild(tdMas);

      // Columna: enlace
      const tdEnlace = document.createElement("td");
      if (item.target_permalink) {
        const enlace = document.createElement("a");
        enlace.href = "https://www.reddit.com" + item.target_permalink;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.textContent = "Link";
        tdEnlace.appendChild(enlace);
      } else {
        tdEnlace.textContent = "";
      }
      tr.appendChild(tdEnlace);



      frag.appendChild(tr);


      //contador++;

      if (expandAll) {
        // Espera a que la fila esté en el DOM antes de expandir
        setTimeout(() => toggleDetalleFila(tr, item, false), 0);
      }
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

function generarDetalleExpandidoSeguro(item) {
  const container = document.createElement("div");
  container.classList.add("divSeguro");

  const tabla = document.createElement("table");

  function addRow(label, value, isHtml = false) {
    const tr = document.createElement("tr");
    const tdClave = document.createElement("td");
    tdClave.className = "tdModalClave";
    tdClave.textContent = label;
    const tdValor = document.createElement("td");
    tdValor.className = "tdModalValor";
    if (isHtml) {
      tdValor.appendChild(value);
    } else {
      tdValor.textContent = value;
    }
    tr.appendChild(tdClave);
    tr.appendChild(tdValor);
    tabla.appendChild(tr);
  }

  if (item.target_author) addRow("Autor", item.target_author);
  if (item.action) addRow("Acción", `${descriptionMap[item.action] || ""}`);
  if (item.description) addRow("Descripción", item.description);
  if (item.details) addRow("Detalle", item.details);
  if (item.created_utc) addRow("Fecha", new Date(item.created_utc * 1000).toLocaleString("en-GB"));
  if (item.mod) addRow("Mod", item.mod);
  if (item.target_title) addRow("Titulo", item.target_title);
  if (item.target_permalink) {
    const enlace = document.createElement("a");
    enlace.href = "https://www.reddit.com" + item.target_permalink;
    enlace.textContent = item.target_permalink;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    addRow("Enlace", enlace, true);
  }

  container.appendChild(tabla);

  if (item.target_body) {
    const h3 = document.createElement("h3");
    h3.textContent = "Contenido";
    container.appendChild(h3);

    const div2 = document.createElement("div");
    div2.classList.add("div2");
    const safeHtml = DOMPurify.sanitize(marked.parse(replaceGiphyMarkdown(item.target_body)));
    div2.innerHTML = safeHtml;
    container.appendChild(div2);

    // --- Agrega el botón especial ---
    if (
      item.action === "removecomment" &&
      item.target_body.trim() === "[ Removed by Reddit ]" &&
      item.target_permalink
    ) {
      // Extraer el id1 del permalink
      const match = item.target_permalink.match(/\/comments\/[^\/]+\/[^\/]+\/([^\/]+)\//);
      const id1 = match ? match[1] : null;

      if (id1) {
        const paramsSearch = new URLSearchParams();
        paramsSearch.append("id",id1);
        const urlSearch2 = new URL(urlSearch);
        urlSearch2.search= paramsSearch.toString();

        const btnSearch = document.createElement("button");
        btnSearch.textContent = "Intentar recuperar";
        btnSearch.style.marginTop = "1rem";
        btnSearch.addEventListener("click", async () => {
          btnSearch.disabled = true;
          btnSearch.textContent = "Consultando...";
          try {
            const resp = await fetch(urlSearch2.toString());
            const data = await resp.json();
            if (resp.ok && data && data.result) {
              // alert("Respuesta:\n" + JSON.stringify(data.result, null, 2));
              // console.log(data.result.data[0].body);
              div2.innerHTML = div2.innerHTML + "\n\n<hr>\n\n"+ DOMPurify.sanitize(marked.parse(replaceGiphyMarkdown(data.result.data[0].body)));;
              
              btnSearch.style.display="none";
              

              const container2 = btnSearch.closest(".divSeguro");

              if (!container2) return;

              // Buscar la primera tabla dentro de ese div
              const table = container2.querySelector("table");
              if (!table) return;

              // Primer <tr> de la tabla
              const firstRow = table.querySelector("tr");
              if (!firstRow) return;

              // Segundo <td> de esa fila
              const secondTd = firstRow.querySelectorAll("td")[1];
              if (!secondTd) return;

              if (secondTd.textContent === "[deleted]"){
                // Modificar el contenido
                secondTd.textContent += " = " + data.result.data[0].author;
                
            }
            } else {
              alert("No se encontró información, intente mas tarde");
            }
          } catch (e) {
            alert("Error consultando, intente mas tarde.");
          }
          btnSearch.disabled = false;
          btnSearch.textContent = "Consultar Search";
        });
        container.appendChild(btnSearch);
      }
    }
    
    // --- Fin botón especial ---
  }

  return container;
}

function toggleDetalleFila(tr, item, scroll=true) {
  // Si ya existe la fila de detalles, la elimina (colapsa con animación)
  if (tr.nextSibling && tr.nextSibling.classList && tr.nextSibling.classList.contains("detalle-expandido")) {
    const detalleTr = tr.nextSibling;
    const animDiv = detalleTr.querySelector('.detalle-expandido-anim');
    if (animDiv) {
      animDiv.classList.remove('activo');
      setTimeout(() => {
        if (detalleTr.parentNode) detalleTr.parentNode.removeChild(detalleTr);
      }, 400);
    } else {
      detalleTr.parentNode.removeChild(detalleTr);
    }
    return;
  }
  // Si no existe, la crea (expande con animación)
  const detalleTr = document.createElement("tr");
  detalleTr.classList.add("detalle-expandido");
  const detalleTd = document.createElement("td");
  detalleTd.colSpan = tr.children.length;

  // Envuelve el contenido en un div animado
  const animDiv = document.createElement("div");
  animDiv.className = "detalle-expandido-anim";
  animDiv.appendChild(generarDetalleExpandidoSeguro(item));
  detalleTd.appendChild(animDiv);
  detalleTr.appendChild(detalleTd);
  tr.parentNode.insertBefore(detalleTr, tr.nextSibling);

  // Activa la animación en el siguiente tick
  setTimeout(() => {
    animDiv.classList.add('activo');
    if (scroll) {
      tr.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }
  }, 10);
}

let expandAll = false;

const toggleExpandAllBtn = document.getElementById("toggleExpandAll");
toggleExpandAllBtn.addEventListener("click", () => {
  expandAll = !expandAll;
  toggleExpandAllBtn.textContent = expandAll ? "Ocultar todos los detalles" : "Mostrar todos los detalles";
  mostrarOcultarTodosExpandibles();
});

function mostrarOcultarTodosExpandibles() {
  // Recorre todas las filas y expande/colapsa según el estado
  document.querySelectorAll("#tablaLogs tbody tr").forEach(tr => {
    // Solo filas principales (sin clase detalle-expandido)
    if (!tr.classList.contains("detalle-expandido")) {
      // Busca si ya está expandido
      const next = tr.nextSibling;
      const yaExpandido = next && next.classList && next.classList.contains("detalle-expandido");
      if (expandAll && !yaExpandido) {
        // Expande si no está expandido
        toggleDetalleFila(tr, tr._item,false);
      } else if (!expandAll && yaExpandido) {
        // Colapsa si está expandido
        toggleDetalleFila(tr, tr._item,false);
      }
    }
  });
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