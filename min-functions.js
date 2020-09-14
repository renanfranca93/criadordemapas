var elementControl = 0,
  allMapElements = [],
  numberStyle = 2,
  typeOfSystem = "";
async function counter() {
  const e = await fetch("https://httpbin.org/get"),
    t = await e.json();
  var n = new XMLHttpRequest();
  n.open("GET", "counter.php?ip=" + t.origin + "&url=" + document.URL, !0),
    n.send();
}
function changeBg() {
  ++numberStyle > 5 && (numberStyle = 1);
  var e = numberStyle + 1;
  e > 5 && (e = 1);
  var t = document.getElementById("selectorBg"),
    n = document.querySelector("body");
  t.removeAttribute("class"),
    n.removeAttribute("class"),
    t.setAttribute("class", "bgSelector bgStyle" + e),
    n.setAttribute("class", "bgStyle" + numberStyle),
    localStorage.setItem("criadordemasmorrabg", "bgStyle" + numberStyle);
}
function rolld6() {
  var e = Math.floor(6 * Math.random()) + 1,
    t = document.getElementById("d6");
  setTimeout(function () {
    t.removeAttribute("class"), t.setAttribute("class", "diceRoller dice" + e);
  }, 1e3),
    t.setAttribute("class", "diceRoller diceWhat shake");
}
function loadPage() {
  var e = localStorage.getItem("criadordemasmorrabg");
  e || (e = "bgStyle2");
  var t = document.querySelector("body");
  t.removeAttribute("class"),
    t.setAttribute("class", e),
    (bgseletor = e.split("bgStyle")),
    (bgSeletorValue = bgseletor[1]),
    bgSeletorValue++,
    bgSeletorValue > 5 && (bgSeletorValue = 1);
  var n = document.getElementById("selectorBg");
  n.removeAttribute("class"),
    n.setAttribute("class", "bgSelector bgStyle" + bgSeletorValue);
  var l = window.location.href;
  -1 !== l.search("modal") && document.getElementById("myBtn").click();
  var o,
    a = l.search("type"),
    d = document.getElementById("logo");
  -1 !== a
    ? ((typeOfSystem = "dg"),
      d.removeAttribute("src"),
      d.setAttribute("src", "img/logo-dungeon.png"),
      document.getElementById("addItemMap").setAttribute("class", "invisible"),
      document
        .getElementById("deleteItemMap")
        .setAttribute("class", "invisible"),
      document.getElementById("toDundGen").setAttribute("class", "invisible"),
      document.getElementById("newMap").setAttribute("class", "invisible"),
      document
        .getElementById("chooseClassMap")
        .setAttribute("class", "invisible"),
      (o = document.getElementById("modalBtn")).setAttribute(
        "src",
        "img/icons/world.png"
      ),
      o.setAttribute("title", "Alternar para o Criador de Mundos"))
    : ((typeOfSystem = "mp"),
      d.removeAttribute("src"),
      d.setAttribute("src", "img/logo-map.png"),
      document
        .getElementById("addItemDungeon")
        .setAttribute("class", "invisible"),
      document
        .getElementById("deleteDgElement")
        .setAttribute("class", "invisible"),
      document.getElementById("toWorldGen").setAttribute("class", "invisible"),
      document.getElementById("newDung").setAttribute("class", "invisible"),
      document.getElementById("chooseClass").setAttribute("class", "invisible"),
      (o = document.getElementById("modalBtn")).setAttribute(
        "src",
        "img/icons/dungeon.png"
      ),
      o.setAttribute("title", "Alternar para o Criador de Dungeons"));
  counter();
}
function redirect(e, t, n) {
  window.location.href = n
    ? t
      ? "./" + e + ".html?modal=1&type=dg"
      : "./" + e + ".html?type=dg"
    : t
    ? "./" + e + ".html?modal=1"
    : "./" + e + ".html?";
}
function closeModal() {
  modal.style.display = "none";
}
function openModal() {
  document.getElementById("myBtn").click();
}
function mountSelectMap() {
  var e = document.getElementById("selectmap"),
    t = localStorage;
  if ("mp" == typeOfSystem) {
    for (var n in t)
      if (n.includes("world.")) {
        var l = n.replace("world.", "");
        ((o = document.createElement("option")).value = l),
          (o.innerHTML = l),
          e.appendChild(o);
      }
  } else
    for (var n in t)
      if (n.includes("dungeon.")) {
        var o;
        l = n.replace("dungeon.", "");
        ((o = document.createElement("option")).value = l),
          (o.innerHTML = l),
          e.appendChild(o);
      }
}
function addElement(e) {
  if ("mp" == typeOfSystem) var t = document.getElementById("addTiles").value;
  else t = document.getElementById("addelement").value;
  var n = t.split("-");
  if (!document.querySelector("#group")) {
    var l = document.querySelector("#corpo"),
      o = document.createElement("div");
    o.setAttribute("id", "group"), l.appendChild(o);
  }
  var a = document.querySelector("#group");
  if (e) {
    var d;
    t = document.getElementById("addTextInput").value;
    return (
      console.log(t),
      (d = document.createElement("div")).setAttribute(
        "id",
        "dgn99text" + elementControl + "dgn99"
      ),
      d.setAttribute("class", "textdiv"),
      d.setAttribute("title", "text" + elementControl),
      (d.innerText = t),
      a.appendChild(d),
      dragElement(
        document.getElementById("dgn99text" + elementControl + "dgn99")
      ),
      allMapElements.push("text" + elementControl),
      mountaAllMapElements(allMapElements),
      void elementControl++
    );
  }
  (d = document.createElement("div")).setAttribute(
    "id",
    "dgn99" + n[1] + elementControl + "dgn99"
  ),
    d.setAttribute("class", n[0] + " " + n[1]),
    d.setAttribute("title", n[1] + elementControl),
    a.appendChild(d),
    dragElement(
      document.getElementById("dgn99" + n[1] + elementControl + "dgn99")
    ),
    allMapElements.push(n[1] + elementControl),
    mountaAllMapElements(allMapElements),
    elementControl++;
}
function deleteMapElement() {
  if ("mp" == typeOfSystem)
    var e = document.getElementById("deleteTiles").value;
  else e = document.getElementById("deleteelement").value;
  document.getElementById("dgn99" + e + "dgn99").remove();
  var t = allMapElements.indexOf(e);
  allMapElements.splice(t, 1), mountaAllMapElements(allMapElements);
}
function saveMap() {
  var e = document.querySelector("#group").outerHTML;
  console.log(e);
  var t = document.getElementById("nomeMapa").value;
  console.log(t),
    "mp" == typeOfSystem
      ? (localStorage.setItem("world." + t, JSON.stringify(e)),
        closeModal(),
        redirect("index", !0))
      : (localStorage.setItem("dungeon." + t, JSON.stringify(e)),
        closeModal(),
        redirect("index", !0, !0));
}
function deleteMap() {
  var e = document.getElementById("selectmap").value;
  "mp" == typeOfSystem
    ? (localStorage.removeItem("world." + e), redirect("index", !0))
    : (localStorage.removeItem("dungeon." + e), redirect("index", !0, !0));
}
function mountaAllMapElements() {
  if ("mp" == typeOfSystem) var e = document.getElementById("deleteTiles");
  else e = document.getElementById("deleteelement");
  e.innerHTML = "";
  var t = document.createElement("option");
  for (
    t.value = -1,
      t.innerHTML = "Selecionar...",
      e.appendChild(t),
      i = allMapElements.length;
    i >= 0;
    i--
  )
    if (void 0 !== allMapElements[i]) {
      var n = document.createElement("option");
      (n.value = allMapElements[i]),
        (n.innerHTML = allMapElements[i]),
        e.appendChild(n);
    }
}
function loadMap(e) {
  if (e) t = e;
  else var t = document.getElementById("selectmap").value;
  var n = document.querySelector("#corpo");
  if (((n.innerHTML = ""), "mp" == typeOfSystem))
    var l = JSON.parse(localStorage.getItem("world." + t)) || "";
  else l = JSON.parse(localStorage.getItem("dungeon." + t)) || "";
  var o = document.createRange().createContextualFragment(l);
  n.appendChild(o);
  var a = l.split("dgn99");
  for (i = a.length; i > 0; i--)
    i % 2 != 0 &&
      void 0 !== a[i] &&
      (allMapElements.push(a[i]),
      dragElement(document.getElementById("dgn99" + a[i] + "dgn99")));
  closeModal(), mountaAllMapElements();
}
function salvarPosicao() {
  var e = document.querySelector("#group");
  download(
    "mp" == typeOfSystem ? "myworld.world" : "mydungeon.dungeon",
    e.outerHTML
  );
}
function download(e, t) {
  var n = document.createElement("a");
  if (
    (n.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(t)
    ),
    n.setAttribute("download", e),
    document.createEvent)
  ) {
    var l = document.createEvent("MouseEvents");
    l.initEvent("click", !0, !0), n.dispatchEvent(l);
  } else n.click();
}
function dragElement(e) {
  var t = 0,
    n = 0,
    l = 0,
    o = 0;
  function a(e) {
    (e = e || window.event).preventDefault(),
      (l = e.clientX),
      (o = e.clientY),
      (document.onmouseup = r),
      (document.onmousemove = d);
  }
  function d(a) {
    (a = a || window.event).preventDefault(),
      (t = l - a.clientX),
      (n = o - a.clientY),
      (l = a.clientX),
      (o = a.clientY),
      (e.style.top = e.offsetTop - n + "px"),
      (e.style.left = e.offsetLeft - t + "px");
  }
  function r() {
    (document.onmouseup = null), (document.onmousemove = null);
  }
  document.getElementById(e.id + "header")
    ? (document.getElementById(e.id + "header").onmousedown = a)
    : (e.onmousedown = a);
}
function readMapFile() {
  if (0 != document.querySelector("#file-input").files.length) {
    var e = document.querySelector("#file-input").files[0];
    if ("mp" == typeOfSystem) {
      if (-1 === e.name.search(".world"))
        return void alert("Erro : Arquivo selecionado não é do tipo .world");
    } else if (-1 === e.name.search(".dungeon"))
      return void alert("Erro : Arquivo selecionado não é do tipo .dungeon");
    var t = new FileReader();
    t.addEventListener("load", function (e) {
      var t = e.target.result;
      console.log(t);
      var n = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5);
      "mp" == typeOfSystem
        ? (localStorage.setItem("world.Importado_" + n, JSON.stringify(t)),
          redirect("index", !0))
        : (localStorage.setItem("dungeon.Importado_" + n, JSON.stringify(t)),
          redirect("index", !0, !0));
    }),
      t.readAsText(e);
  } else alert("Erro : Nenhum arquivo de dungeon selecionado");
}
var modal = document.getElementById("myModal"),
  btn = document.getElementById("myBtn"),
  span = document.getElementsByClassName("close")[1];
(btn.onclick = function () {
  modal.style.display = "block";
}),
  (span.onclick = function () {
    modal.style.display = "none";
  }),
  (window.onclick = function (e) {
    e.target == modal && (modal.style.display = "none");
  });
var modal2 = document.getElementById("confirmChange"),
  modalBtn = document.getElementById("modalBtn"),
  span2 = document.getElementsByClassName("nao_class")[0],
  span3 = document.getElementsByClassName("close")[0];
(modalBtn.onclick = function () {
  modal2.style.display = "block";
}),
  (span2.onclick = function () {
    modal2.style.display = "none";
  }),
  (span3.onclick = function () {
    modal2.style.display = "none";
  }),
  (window.onclick = function (e) {
    e.target == modal2 && (modal2.style.display = "none");
  });
var modalUp = document.getElementById("uploadImageModal"),
  btnUp = document.getElementById("btnUpload"),
  spanUp = document.getElementById("closeUp");
(btnUp.onclick = function () {
  modalUp.style.display = "block";
}),
  (spanUp.onclick = function () {
    modalUp.style.display = "none";
  }),
  (window.onclick = function (e) {
    e.target == modal && (modalUp.style.display = "none");
  });
var input = document.getElementById("myfile");
function showImage(e) {
  if (!document.querySelector("#group")) {
    var t = document.querySelector("#corpo"),
      n = document.createElement("div");
    n.setAttribute("id", "group"), t.appendChild(n);
  }
  var l = document.querySelector("#group");
  if ("mp" == typeOfSystem)
    var o = document.getElementById("chooseClassMap").value;
  else o = document.getElementById("chooseClass").value;
  if (-1 != o) {
    var a = document.createElement("img");
    a.setAttribute("src", "data:image/jpeg;base64," + e),
      a.setAttribute("id", "dgn99img" + elementControl + "dgn99"),
      a.setAttribute("title", "img" + elementControl),
      a.setAttribute("class", o),
      l.appendChild(a),
      dragElement(
        document.getElementById("dgn99img" + elementControl + "dgn99")
      ),
      allMapElements.push("img" + elementControl),
      mountaAllMapElements(allMapElements),
      (modalUp.style.display = "none"),
      elementControl++;
  } else alert("Escolha uma classe antes de escolher a imagem!");
}
(input.onchange = function () {
  var e = input.files[0],
    t = new FileReader();
  (t.onloadend = function () {
    showImage(t.result.replace(/^data:.+;base64,/, ""));
  }),
    t.readAsDataURL(e);
}),
  loadPage(),
  mountSelectMap(),
  counter();
