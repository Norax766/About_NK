async function loadAbout(){

    const res = await fetch("data/sobre_mi.json");
    const data = await res.json();

    document.getElementById("about-title").textContent = data.titulo;

    const container = document.getElementById("about-content");

    container.innerHTML = "";

    data.contenido.forEach(item=>{

        const element=document.createElement(
            item.tipo==="ascii" ? "pre" : "p"
        );

        element.className=
            item.tipo==="ascii"
            ? "about-ascii"
            : "about-text";

        element.textContent=item.valor;

        container.appendChild(element);

    });

}

loadAbout();