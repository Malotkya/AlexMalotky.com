let tree = new Array();
let width = 0;
let max = 150;

window.onload = () => {
    let select = document.querySelector("#select");
    select.addEventListener("change", updateAll);

    populate( [...select.options] );

    let init = document.querySelector("#initial");
    if(init != null) {
        select.value = init.value;
    }

    updateAll();
};

const populate = list => {
    list.forEach(node => {
        let buffer = {
            id: node.attributes.id.nodeValue,
            name: node.attributes.name.nodeValue,
            picture: node.attributes.picture.nodeValue,
            parent_id: node.attributes.pid.nodeValue
        };

        tree.push(buffer);
    });
}

const updateAll = () => {
    let select = document.querySelector("#select");
    let person = findById(select.value);
    person.children = findChildren(person);

    document.querySelectorAll(".name").forEach(node => {
        node.innerText = person.name;
    })

    width = 0;
    updateTree(person);
    updateEdit(person);
    updateDelete(person);

    location.href = `#${select.value}`;

    zoom({target:{
        localName: "a",
        id: select.value
    }});
}

const updateTree = person => {
    let list = document.createElement("ul");
    let li = render(person);
    list.appendChild(li);

    let target = document.querySelector(".tree");
    target.innerHTML = "";
    target.appendChild(list);
    list.style.width = `${width}px`;
}

const updateEdit = person => {
    let form = document.querySelector("#modalEdit");
    if(form != null) {
        let parent = form.querySelector("#parent");
        let decendents = getDecendentsId(person);

        parent.value = person.parent_id;
        [...parent.options].forEach(option=> {
            if( decendents.includes(option.value) ) {
                option.disabled = true;
                option.className = "text-danger";
            } else {
                option.disabled = false;
                option.className = "";
            }

        });

        form.querySelector("#name").value = person.name;
        form.querySelector("#id").value = person.id;
    }
}

const updateDelete = person => {
    let form = document.querySelector("#modalDelete");

    if(form != null) {
        form.querySelector("#id").value = person.id;
    }
}

const zoom = event => {
    let target = event.target;
    while(target.localName != "a")
        target = target.parentNode;

    let id = Number(target.id);
    if( isNaN(id) )
        id = 1;

    let person = findById(id);
    let view = document.querySelector("#view");
    view.innerHTML = "";

    let img = document.createElement("img");
    if(person.picture === "")
        img.src = "/img/Family/none.png";
    else
        img.src = "/img/Family/" + person.picture;

    view.appendChild(img);
}

const findChildren = parent => {
    let children = tree.filter(child => child.parent_id == parent.id);
    children.forEach( child => child.children = findChildren(child) );
    return children;
}

const getDecendentsId = person => {
    let output = Array(person.id);
    person.children.forEach(child => output = output.concat( getDecendentsId(child) ));
    return output;
}

const render = parent => {
    let li = document.createElement("li");

    let a = document.createElement("a");
    a.setAttribute("href", "#");

    let span = document.createElement("span");
    span.innerText = parent.name;
    li.appendChild(span);

    let figure = document.createElement("figure");
    figure.style.width = `${max-20}px`;
    figure.style.margin = "auto";

    let img = document.createElement("img");
    if(parent.picture === "") {
        img.src = "/img/Family/none.png";
    }else {
        img.src = "/img/Family/" + parent.picture;
    }
    figure.appendChild(img);
    li.appendChild(figure);

    a.appendChild(span);
    a.appendChild(figure);
    a.id = parent.id;
    a.addEventListener("click", zoom)
    a.style.width = `${max}px`;

    li.appendChild(a);
    if(parent.children.length > 0) {
        let ul = document.createElement("ul");
        parent.children.forEach( child => {
            ul.appendChild(render(child));
            width += (max-20);
        });
        li.appendChild(ul);
    }
    return li;
}

const findById = id => {
    for(let i=0; i<tree.length; i++) {
        if(tree[i].id == id)
            return tree[i];
    }

    return null;
}
