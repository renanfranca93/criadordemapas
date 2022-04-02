var elementControl = 0;
var allMapElements = [];
var numberStyle = 2;
var typeOfSystem = "";

async function counter() {
    const response = await fetch("https://httpbin.org/get");
    const myJson = await response.json(); //extract JSON from the http response
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "counter.php?ip=" + myJson.origin + "&url=" + document.URL,
        true
    );
    xhttp.send();
}

function changeBg() {
    numberStyle++;
    if (numberStyle > 5) {
        numberStyle = 1;
    }
    var nextStyle = numberStyle + 1;
    if (nextStyle > 5) {
        nextStyle = 1;
    }
    var seletor = document.getElementById("selectorBg");
    var body = document.querySelector("body");

    seletor.removeAttribute("class");
    body.removeAttribute("class");

    seletor.setAttribute("class", "bgSelector btn btn-big-plus bgStyle" + nextStyle);
    body.setAttribute("class", "bgStyle" + numberStyle);

    localStorage.setItem("criadordemasmorrabg", "bgStyle" + numberStyle);
}

function rolld6() {
    var random = Math.floor(Math.random() * 6) + 1;

    var d6 = document.getElementById("d6");
    setTimeout(function () {
        d6.removeAttribute("class");
        d6.setAttribute("class", "diceRoller btn btn-big-plus dice" + random);
    }, 1000);
    d6.setAttribute("class", "diceRoller diceWhat shake btn btn-big-plus");
}

function addEvents() {
    // Alguns eventos não podem ser aplicados Inline
    // Por isso essa função adiciona eventos na manualmente
    const fileInput = document.getElementById('file-input');
    fileInput.onchange = () => readMapFile();
}

function getLocalStorageList() {
    var bd = localStorage;
    var bdList = Object.keys(bd).map((key) => [key, bd[key]]);

    const wordType = typeOfSystem == "mp" ? "world." : "dungeon.";
    const mapList = bdList.filter(x => x[0].includes(wordType));
    const mapListFormated = mapList.map(x => [x[0].replace(wordType, ""), x[1]]);
    console.log(mapListFormated);

    return mapListFormated;
}


function loadPage() {
    var bg = localStorage.getItem("criadordemasmorrabg");
    if (!bg) {
        bg = "bgStyle2";
    }
    var body = document.querySelector("body");
    body.removeAttribute("class");
    body.setAttribute("class", bg);

    bgseletor = bg.split("bgStyle");
    bgSeletorValue = bgseletor[1];

    bgSeletorValue++;

    if (bgSeletorValue > 5) {
        bgSeletorValue = 1;
    }

    var seletor = document.getElementById("selectorBg");
    seletor.removeAttribute("class");
    seletor.setAttribute("class", "bgSelector btn btn-big-plus bgStyle" + bgSeletorValue);

    var url = window.location.href;

    var modal = url.search("modal");

    if (modal !== -1) {
        document.getElementById("myBtn").click();
    }

    var screenType = url.search("type");

    var logoImg = document.getElementById("logo");

    var imageSelectorDungeon = document.getElementById("chooseDungeonType");
    var imageSelectorMundo = document.getElementById("chooseWorldType");
    if (screenType !== -1) {
        //se for dungeon precisa do parametro type=dg
        typeOfSystem = "dg";
        logoImg.removeAttribute("src");
        logoImg.setAttribute("src", "img/logo-dungeon.png");

        var sumirIten2 = document.getElementById("deleteItemMap");
        sumirIten2.setAttribute("class", "invisible");
        var sumirIten3 = document.getElementById("toDundGen");
        sumirIten3.setAttribute("class", "invisible");
        var sumirIten4 = document.getElementById("newMap");
        sumirIten4.setAttribute("class", "invisible");
        // var sumirIten5 = document.getElementById("chooseClassMap");
        // sumirIten5.setAttribute("class", "invisible");
        var nameButton = document.getElementById("changeMode");
        nameButton.setAttribute("src", "img/icons/new/world.png");
        nameButton.setAttribute("title", "Alternar para o Criador de Mundos");

        imageSelectorMundo.setAttribute("class", "invisible");

        // nameButton.innerHTML = "Criador de Mundos";
    } else {
        //se não tiver o parametro type é do tipo criador de mundos
        typeOfSystem = "mp";
        logoImg.removeAttribute("src");
        logoImg.setAttribute("src", "img/logo-map.png");

        var sumirIten2 = document.getElementById("deleteDgElement");
        sumirIten2.setAttribute("class", "invisible");
        var sumirIten3 = document.getElementById("toWorldGen");
        sumirIten3.setAttribute("class", "invisible");
        var sumirIten4 = document.getElementById("newDung");
        sumirIten4.setAttribute("class", "invisible");
        var sumirIten5 = document.getElementById("chooseClass");
        sumirIten5.setAttribute("class", "invisible");
        var nameButton = document.getElementById("changeMode");
        // nameButton.innerHTML = "Criador de Masmorras";
        nameButton.setAttribute("src", "img/icons/new/dungeon.png");
        nameButton.setAttribute("title", "Alternar para o Criador de Dungeons");

        imageSelectorDungeon.setAttribute("class", "invisible");
    }
    counter();

    addEvents();
    setupCustomSelect();
}



function redirect(page, modal, type) {
    if (type) {
        if (modal) {
            window.location.href = "./" + page + ".html?modal=1&type=dg";
        } else {
            window.location.href = "./" + page + ".html?type=dg";
        }
    } else if (modal) {
        window.location.href = "./" + page + ".html?modal=1";
    } else {
        window.location.href = "./" + page + ".html?";
    }
}



function openModal() {
    document.getElementById("myBtn").click();
}

function mountSelectMap() {
    console.log("mountSelectMap()")
    var option = document.getElementById("selectmap");
    option.innerHTML = '';
    var elementoDefault = document.createElement("option");
    elementoDefault.value = -1;
    elementoDefault.innerHTML = "Nenhum";
    elementoDefault.setAttribute("selected", true);
    option.appendChild(elementoDefault);

    const mapList = getLocalStorageList();

    mapList.forEach(map => {
        var mapName = map[0];
        var elemento = document.createElement("option");
        elemento.value = mapName;
        elemento.innerHTML = mapName;
        option.appendChild(elemento);
    })
}

function addElement(elemento, text) {
    var element = elemento?.split("-");
    if (!document.querySelector("#group")) {
        var corpo = document.querySelector("#corpo");
        var localCreation = document.createElement("div");
        localCreation.setAttribute("id", "group");
        corpo.appendChild(localCreation);
    }
    var local = document.querySelector("#group");
    if (text) {
        var source = document.getElementById("addTextInput").value;
        console.log(source);
        var newElement = document.createElement("div");
        newElement.setAttribute("id", "dgn99text" + elementControl + "dgn99");
        newElement.setAttribute("class", "textdiv");
        newElement.setAttribute("title", "text" + elementControl);
        newElement.innerText = source;
        local.appendChild(newElement);
        dragElement(
            document.getElementById("dgn99text" + elementControl + "dgn99")
        );
        allMapElements.push("text" + elementControl);
        mountaAllMapElements(allMapElements);
        elementControl++;
        return;
    }
    var newElement = document.createElement("div");
    newElement.setAttribute(
        "id",
        "dgn99" + element[1] + elementControl + "dgn99"
    );
    newElement.setAttribute("class", element[0] + " " + element[1]);
    newElement.setAttribute("title", element[1] + elementControl);
    // newElement.setAttribute('class',element[1]);
    local.appendChild(newElement);
    dragElement(
        document.getElementById("dgn99" + element[1] + elementControl + "dgn99")
    );
    allMapElements.push(element[1] + elementControl);
    mountaAllMapElements(allMapElements);
    elementControl++;
}

function deleteMapElement() {
    if (typeOfSystem == "mp") {
        var source = document.getElementById("deleteTiles").value;
    } else {
        var source = document.getElementById("deleteelement").value;
    }

    var toDeleteElement = document.getElementById("dgn99" + source + "dgn99");
    toDeleteElement.remove();
    var index = allMapElements.indexOf(source);
    allMapElements.splice(index, 1);
    mountaAllMapElements(allMapElements);
}

function saveMap() {
    console.log("saveMap()");
    var corpo = document?.querySelector("#group")?.outerHTML;
    console.log(corpo);
    var nomeMapa = document.getElementById("nomeMapa").value.trim();
    console.log("nomeMapa");
    console.log(nomeMapa);

    if (corpo === undefined) {
        alert("Mapa está vazio!");
        return;
    }

    const mapList = getLocalStorageList().map(x => x[0]);

    if (["", ...mapList].includes(nomeMapa.trim())) {
        alert("Nome vazio/já existe!");
        return;
    }

    if (typeOfSystem == "mp") {
        localStorage.setItem("world." + nomeMapa, JSON.stringify(corpo));
        closeMainModal();
        //redirect("index", true);
    } else {
        localStorage.setItem("dungeon." + nomeMapa, JSON.stringify(corpo));
        closeMainModal();
        //redirect("index", true, true);
    }

    mountSelectMap();
}

function deleteMap() {
    var nomeMapa = document.getElementById("selectmap").value;
    if (nomeMapa == -1) {
        alert("Selecione um mapa!");
        return;
    }

    var typeOfSystemLocal = typeOfSystem == "mp" ? "world." : "dungeon.";
    localStorage.removeItem(typeOfSystemLocal + nomeMapa);
    mountSelectMap();

}

function mountaAllMapElements() {
    console.log("mountaAllMapElements()");
    if (typeOfSystem == "mp") {
        var option = document.getElementById("deleteTiles");
    } else {
        var option = document.getElementById("deleteelement");
    }

    option.innerHTML = "";
    var selecione = document.createElement("option");
    selecione.value = -1;
    selecione.innerHTML = "Selecionar...";
    option.appendChild(selecione);

    for (i = allMapElements.length; i >= 0; i--) {
        if (allMapElements[i] !== undefined) {
            var elemento = document.createElement("option");
            elemento.value = allMapElements[i];
            elemento.innerHTML = allMapElements[i];
            option.appendChild(elemento);
        }
    }
}

function loadMapaBase(posInicial) {
    var corpo = document.querySelector("#corpo");
    corpo.innerHTML = "";

    var frag = document.createRange().createContextualFragment(posInicial);
    console.log("frag");
    console.log(frag);


    corpo.appendChild(frag);

    var catchElement = posInicial.split("dgn99");
    console.log("catchElement");
    console.log(catchElement);


    for (i = catchElement.length; i > 0; i--) {
        if (i % 2 !== 0) {
            if (catchElement[i] !== undefined) {
                allMapElements.push(catchElement[i]);
                dragElement(
                    document.getElementById("dgn99" + catchElement[i] + "dgn99")
                );
            }
        }
    }
    closeMainModal();
    mountaAllMapElements();
}

function loadMap(map) {
    console.log("loadMap()");
    console.log(map);

    var option = map ? map : document.getElementById("selectmap").value;
    console.log(option);
    if (option == -1) {
        alert("Selecione um mapa!");
        return;
    }



    var typeOfSystemLocal = typeOfSystem == "mp" ? "world." : "dungeon.";
    var posInicial = JSON.parse(localStorage.getItem(typeOfSystemLocal + option)) || "";
    console.log("posInicial");
    console.log(posInicial);

    loadMapaBase(posInicial);
}

function salvarPosicao() {
    console.log("salvarPosicao()")
    var saved = document.querySelector("#group");
    var nomeMapa = document.getElementById("nomeMapaExportar").value.trim();
    console.log(saved);

    if (!saved) {
        alert("Mapa está vazio!");
        return;
    }

    if (nomeMapa.trim() == "") {
        alert("Nome vazio!");
        return;
    }

    var typeOfSystemLocal = typeOfSystem == "mp" ? ".world" : ".dungeon";
    download(nomeMapa + typeOfSystemLocal, saved.outerHTML);
}

function download(filename, text) {
    var pom = document.createElement("a");
    pom.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    pom.setAttribute("download", filename);

    if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

//FUNÇÕES PARA TORNAR O ELEMENTO ARRASTÁVEL

function dragElement(elmnt) {
    console.log("dragElement");
    console.log(elmnt);
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        console.log("dragMouseDown");
        console.log(numberStyle);
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        const moveTheme = [3,5].includes(numberStyle) ? "dark" : "light";
        elmnt.classList.toggle(moveTheme);
        elmnt.classList.toggle("moving");
    }

    function elementDrag(e) {
        console.log("elementDrag");
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        console.log("closeDragElement");
        const moveTheme = [3,5].includes(numberStyle) ? "dark" : "light";
        elmnt.classList.remove("dark");
        elmnt.classList.remove("light");
        elmnt.classList.remove("moving");
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//FUNÇÃO PARA LER TXT

function readMapFile() {
    console.log("readMapFile");
    // document.querySelector("#read-button").addEventListener('click', function() {
    if (document.querySelector("#file-input").files.length == 0) {
        alert("Erro : Nenhum arquivo de dungeon selecionado");
        return;
    }

    // first file selected by user
    var file = document.querySelector("#file-input").files[0];

    var typeOfSystemLocal = typeOfSystem == "mp" ? ".world" : ".dungeon";
    if (file.name.search(typeOfSystemLocal) === -1) {
        alert("Erro : Arquivo selecionado não é do tipo " + typeOfSystemLocal);
        return;
    }

    // perform validation on file type & size if required

    // read the file
    var reader = new FileReader();

    // file reading finished successfully
    reader.addEventListener("load", function (e) {
        // contents of file in variable
        var text = e.target.result;

        console.log(text);
        var name = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5);

        if (typeOfSystem == "mp") {
            localStorage.setItem("world.Importado_" + name, JSON.stringify(text));
            // redirect("index", true);
        } else {
            localStorage.setItem("dungeon.Importado_" + name, JSON.stringify(text));
            // redirect("index", true, true);
        }

        loadMapaBase(text);
    });

    // read as text file
    reader.readAsText(file);
}

//funcao do modal


var mainModal = document.getElementById("mainModal");
var modalSobre = document.getElementById("modalSobre");
var modalImagens = document.getElementById("modalImagens");
var modalConfirm = document.getElementById("modalConfirm");
var modalCarregar = document.getElementById("modalCarregar");

function openMainModal() {
    mainModal.style.display = "block";
}

function closeMainModal() {
    mainModal.style.display = "none";
    closeAllModalContent();
}

function closeAllModalContent() {
    document.getElementById("nomeMapa").value = "";
    document.getElementById("nomeMapaExportar").value = "";
    document.getElementById("selectmap").selectedIndex = 0;
    modalSobre.style.display = "none";
    modalImagens.style.display = "none";
    modalConfirm.style.display = "none";
    modalCarregar.style.display = "none";
}

function openModalSobre() {
    closeAllModalContent();
    openMainModal();
    modalSobre.style.display = "block";
}
function openModalImagens() {
    closeAllModalContent();
    openMainModal();
    modalImagens.style.display = "block";
}
function openModalConfirm() {
    closeAllModalContent();
    openMainModal();
    modalConfirm.style.display = "block";
}
function openModalCarregar() {
    closeAllModalContent();
    openMainModal();
    modalCarregar.style.display = "block";
}



var modal = document.getElementById("myModal");

//var aboutModal = document.getElementById("aboutModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtnn");

// Get the button that opens the modal
var aboutBtn = document.getElementById("aboutBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == mainModal) {
        closeMainModal();
    }
};

//funcao do modal2

var modal2 = document.getElementById("confirmChange");

// Get the button that opens the modal
var modalBtn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("nao_class")[0];
var span3 = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal




//funcao do modal

var modalUp = document.getElementById("uploadImageModal");


// Get the <span> element that closes the modal
var spanUp = document.getElementById("closeUp");



// When the user clicks on <span> (x), close the modal
spanUp.onclick = function () {
    modalUp.style.display = "none";
};


var b64 = "";
var input = document.getElementById("myfile");
input.onchange = function () {
    var file = input.files[0],
        reader = new FileReader();

    reader.onloadend = function (e) {
        b64 = reader.result.replace(/^data:.+;base64,/, "");
        //showImage(b64);
        let previewImg = document.getElementById("imageModalPreview");
        previewImg.setAttribute("src", "data:image/jpeg;base64," + b64);
        //previewImg.setAttribute("style", `background: center / contain no-repeat url('${reader.result}'); `);
        //previewImg.style.backgroundImage = "data:image/jpeg;base64," + b64;
    };

    reader.readAsDataURL(file);
};

function showImage() {
    if (!document.querySelector("#group")) {
        var corpo = document.querySelector("#corpo");
        var localCreation = document.createElement("div");
        localCreation.setAttribute("id", "group");
        corpo.appendChild(localCreation);
    }
    var local = document.querySelector("#group");
    if (typeOfSystem == "mp") {
        var chooseClassElement = document.getElementById("chooseWorldType");
        var classImg = document.getElementById("chooseWorldType").value;
    } else {
        var chooseClassElement = document.getElementById("chooseDungeonType");
        var classImg = document.getElementById("chooseDungeonType").value;
    }

    if (classImg == -1) {
        alert("Escolha uma classe antes de escolher a imagem!");
        return;
    }
    if (b64 == "") {
        alert("Escolha uma imagem!");
        return;
    }
    var randonString = Math.random().toString(36).substring(2, 6);
    var img = document.createElement("img");
    img.setAttribute("src", "data:image/jpeg;base64," + b64);
    img.setAttribute(
        "id",
        "dgn99img" + randonString + "-" + elementControl + "dgn99"
    );
    img.setAttribute("title", "img" + elementControl);
    img.setAttribute("class", classImg);
    local.appendChild(img);
    dragElement(
        document.getElementById(
            "dgn99img" + randonString + "-" + elementControl + "dgn99"
        )
    );
    allMapElements.push("img" + randonString + "-" + elementControl);
    mountaAllMapElements(allMapElements);
    modalUp.style.display = "none";
    elementControl++;

    var input = document.getElementById("myfile");
    input.value = "";
    chooseClassElement.value = -1;
    b64 = "";
    let previewImg = document.getElementById("imageModalPreview");
    previewImg.removeAttribute("src");
    previewImg.setAttribute("class", "template-image");
    closeMainModal();
}

function changeDungeonType() {
    let dungeonType = document.getElementById("chooseDungeonType").value;
    console.log(dungeonType);
    let previewImg = document.getElementById("imageModalPreview");
    let previewBackground = "";

    switch (dungeonType) {
        case "upCreature":
            previewBackground = "img/templates/criatura.png";
            break;
        case "upSmallItem":
            previewBackground = "img/templates/criatura.png";
            break;
        case "upMediumItem":
            previewBackground = "img/templates/criatura.png";
            break;
        case "upSmallRoom":
            previewBackground = "img/templates/sala-pequena.png";
            break;
        case "upBigRoom":
            previewBackground = "img/templates/sala-grande.png";
            break;
        case "upVertCorridor":
            previewBackground = "img/templates/corredor-vertical.png";
            break;
        case "upHorCorridor":
            previewBackground = "img/templates/corredor-horizontal.png";
            break;
    }

    //previewImg.setAttribute("src", previewBackground);
    previewImg.setAttribute("class", "template-image " + dungeonType);
}

function changeWorldType() {
    let worldType = document.getElementById("chooseWorldType").value;
    let previewImg = document.getElementById("imageModalPreview");
    let previewBackground = "";

    switch (worldType) {
        case "terrain":
            previewBackground = "img/templates/terreno.png";
            break;
        case "squareShapeBig":
            previewBackground = "img/templates/local.png";
            break;
    }

    // previewImg.setAttribute("style", `background: url('${previewBackground}')`);
    // previewImg.setAttribute("src", previewBackground);
    console.log(previewImg.className);
    previewImg.setAttribute("class", "template-image " + worldType);
}

// Custom Select
const iconsPrefix = "./img/icons/new/menu-icons"
const selectWorld = [
    {
        grupo: "Terreno",
        itens: [
            {
                nome: "Planície",
                value: "terrain-plane",
                icon: `${iconsPrefix}/terreno/planicie.png`
            },
            {
                nome: "Floresta",
                value: "terrain-forest",
                icon: `${iconsPrefix}/terreno/floresta.png`
            },
            {
                nome: "Pântano",
                value: "terrain-pant",
                icon: `${iconsPrefix}/terreno/pantano.png`
            },
            {
                nome: "Montanha",
                value: "terrain-mountain",
                icon: `${iconsPrefix}/terreno/montanha.png`
            },
            {
                nome: "Água",
                value: "terrain-water",
                icon: `${iconsPrefix}/terreno/agua.png`
            },
            {
                nome: "Deserto",
                value: "terrain-desert",
                icon: `${iconsPrefix}/terreno/deserto.png`
            },
            {
                nome: "Gelo",
                value: "terrain-ice",
                icon: `${iconsPrefix}/terreno/gelo.png`
            },
        ]
    },
    {
        grupo: "Token jogador",
        itens: [
            {
                nome: "Jogador 1",
                value: "player-player1",
                icon: `${iconsPrefix}/jogador/jogador 1.png`
            },
            {
                nome: "Jogador 2",
                value: "player-player2",
                icon: `${iconsPrefix}/jogador/jogador 2.png`
            },
            {
                nome: "Jogador 3",
                value: "player-player3",
                icon: `${iconsPrefix}/jogador/jogador 3.png`
            },
            {
                nome: "Jogador 4",
                value: "player-player4",
                icon: `${iconsPrefix}/jogador/jogador 4.png`
            },
        ]
    },
    {
        grupo: "Locais",
        itens: [
            {
                nome: "Entrada de Dungeon",
                value: "squareShapeBig-dungeon_entrance",
                icon: `${iconsPrefix}/locais/entrada-dungeon.png`
            },
            {
                nome: "Cidade 1",
                value: "squareShapeBig-city1",
                icon: `${iconsPrefix}/locais/cidades1.png`
            },
            {
                nome: "Cidade 2",
                value: "squareShapeBig-city2",
                icon: `${iconsPrefix}/locais/cidades2.png`
            },
            {
                nome: "Cidade 3",
                value: "squareShapeBig-city3",
                icon: `${iconsPrefix}/locais/cidades3.png`
            },
            {
                nome: "Cidade 4",
                value: "squareShapeBig-city4",
                icon: `${iconsPrefix}/locais/cidades4.png`
            },
            {
                nome: "Forte",
                value: "squareShapeBig-fort",
                icon: `${iconsPrefix}/locais/forte.png`
            },
            {
                nome: "Portal",
                value: "squareShapeBig-portal",
                icon: `${iconsPrefix}/locais/portal.png`
            },
            {
                nome: "Oasis",
                value: "squareShapeBig-oasis",
                icon: `${iconsPrefix}/locais/oasis.png`
            },
            {
                nome: "Ruínas",
                value: "squareShapeBig-ruins",
                icon: `${iconsPrefix}/locais/ruinas.png`
            },
            {
                nome: "Torre 1",
                value: "squareShapeBig-tower1",
                icon: `${iconsPrefix}/locais/torre1.png`
            },
            {
                nome: "Torre 2",
                value: "squareShapeBig-tower2",
                icon: `${iconsPrefix}/locais/torre2.png`
            },
            {
                nome: "Pedras",
                value: "squareShapeBig-rocks",
                icon: `${iconsPrefix}/locais/pedras.png`
            },
            {
                nome: "Navio naufragado",
                value: "squareShapeBig-ship",
                icon: `${iconsPrefix}/locais/navio-naufragado.png`
            }
        ]
    }
];

const selectDungeon = [
    {
        grupo: "Cenário",
        itens: [
            {
                nome: "Corredor Horizontal",
                value: "room-corridorh",
                icon: `${iconsPrefix}/cenarios/corredor-horizontal.png`
            },
            {
                nome: "Corredor Vertical",
                value: "room-corridorv",
                icon: `${iconsPrefix}/cenarios/corredor-vertical.png`
            },
            {
                nome: "Sala pequena",
                value: "room-smallRoom",
                icon: `${iconsPrefix}/cenarios/sala-pequena.png`
            },
            {
                nome: "Sala grande",
                value: "room-bigRoom",
                icon: `${iconsPrefix}/cenarios/sala.png`
            },
            {
                nome: "Escadaria",
                value: "squareShapeMedium-stairs",
                icon: `${iconsPrefix}/cenarios/escadas.png`
            },
            {
                nome: "Tocha",
                value: "itemMediumPortrait-torch",
                icon: `${iconsPrefix}/cenarios/tocha.png`
            },
            {
                nome: "Trono",
                value: "itemMediumPortrait-trhone",
                icon: `${iconsPrefix}/cenarios/trono.png`
            },
            {
                nome: "Sangue",
                value: "squareShapeMedium-blood",
                icon: `${iconsPrefix}/cenarios/sangue.png`
            },
            {
                nome: "Ossos",
                value: "squareShapeMedium-bones",
                icon: `${iconsPrefix}/cenarios/ossos.png`
            }
        ]
    },
    {
        grupo: "Criaturas",
        itens: [
            {
                nome: "Cavaleiro",
                value: "creature-knight",
                icon: `${iconsPrefix}/criaturas/cavaleiro.png`
            },
            {
                nome: "Goblin",
                value: "creature-goblin",
                icon: `${iconsPrefix}/criaturas/goblin.png`
            },
            {
                nome: "Lobo",
                value: "creature-wolf",
                icon: `${iconsPrefix}/criaturas/lobo.png`
            },
            {
                nome: "Aranha",
                value: "creature-spider",
                icon: `${iconsPrefix}/criaturas/aranha.png`
            },
            {
                nome: "Arqueiro",
                value: "creature-archer",
                icon: `${iconsPrefix}/criaturas/arqueiro.png`
            },
            {
                nome: "Ladrão",
                value: "creature-thief",
                icon: `${iconsPrefix}/criaturas/ladrao.png`
            },
            {
                nome: "Bárbaro",
                value: "creature-barbarian",
                icon: `${iconsPrefix}/criaturas/barbaro.png`
            },
            {
                nome: "Esqueleto",
                value: "creature-skeleton",
                icon: `${iconsPrefix}/criaturas/esqueleto.png`
            },
            {
                nome: "Guerreiro",
                value: "creature-rogue",
                icon: `${iconsPrefix}/criaturas/guerreiro.png`
            },
            {
                nome: "Orc",
                value: "creature-orc",
                icon: `${iconsPrefix}/criaturas/orc.png`
            },
            {
                nome: "Ogro",
                value: "creature-ogre",
                icon: `${iconsPrefix}/criaturas/ogro.png`
            },
            {
                nome: "Dragão",
                value: "creature-dragon",
                icon: `${iconsPrefix}/criaturas/dragao.png`
            }
        ]
    },
    {
        grupo: "Itens",
        itens: [
            {
                nome: "Baú",
                value: "itemSmall-chest",
                icon: `${iconsPrefix}/itens/bau.png`
            },
            {
                nome: "Chave",
                value: "itemSmall-key",
                icon: `${iconsPrefix}/itens/chave.png`
            },
            {
                nome: "Fogueira",
                value: "itemSmall-fire",
                icon: `${iconsPrefix}/itens/fogueira.png`
            },
            {
                nome: "Porta aberta",
                value: "itemMediumPortrait-dooropen",
                icon: `${iconsPrefix}/itens/porta-aberta.png`
            },
            {
                nome: "Porta fechada",
                value: "itemMediumPortrait-doorclosed",
                icon: `${iconsPrefix}/itens/porta-fechada.png`
            }
        ]
    }
];

const getHeader = (grupo, content) => {
    return `
      <span class="custom-option-header">${grupo}</span>
      <div class="custom-options-content">
        ${content}
      </div>
    `;
};

const getCustomOption = ({ nome, value, icon }) => {
    return `
      <span class="custom-option" data-value="${value}" onclick="addElement('${value}')">
        <img src="${icon}" title="${nome}"> 
      </span>
    `;
};

function setupCustomSelect() {
    console.log("setupCustomSelect");
    // Colocando o evento de fechar 
    for (const dropdown of document.querySelectorAll(".select-trigger")) {
        dropdown.addEventListener("click", function () {
            this.parentNode.parentNode
                .querySelector(".select")
                .classList.toggle("open");
        });
    }
    window.addEventListener("click", function (e) {
        for (const select of document.querySelectorAll(".select")) {
            if (!select.contains(e.target)) {
                select.classList.remove("open");
            }
        }
    });
    const listaSelect = typeOfSystem == "mp" ? selectWorld : selectDungeon;

    // preencher o select
    let grupoContent = "";
    let optionContent = "";
    for (const grupo of listaSelect) {
        optionContent = "";
        for (const item of grupo.itens) {
            optionContent += getCustomOption(item);
        }
        grupoContent += getHeader(grupo.grupo, optionContent);
    }
    document.querySelector("#select-itens").innerHTML = grupoContent;

}

loadPage();
mountSelectMap();