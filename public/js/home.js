const init = () => {
    document.querySelector("#upload").addEventListener("change", upload);

    fetch("/ejs/home.ejs").then(responce => {
        if (responce.ok)
            return responce.text();

        throw new Error("Bad Responce");
    }).then(text => {
        validate(text)
    }).catch(e => {
        console.error(e);
    })
}

const validate = string => {
    document.querySelector("#text").value = string;

    let buffer = document.createElement("html");
    buffer.innerHTML = string;

    let list = [...buffer.querySelectorAll("img")]
    fetch("/img/Home").then(res => {
        if(res.ok)
            return res.json();

        throw Error("Bad Responce");
    }).then(uploaded => sort(list,uploaded)).catch(e => {
        console.error(e);
    })
};

const sort = (list, uploaded) => {
    let output = document.querySelector("#images");

    output.appendChild(createHeader("Used Images"));
    list.forEach((img,i) => {

        let strings = img.src.split("/");
        let j = uploaded.indexOf(strings[strings.length-1]);
        if(j >= 0) {
            output.appendChild(createImage(img));
            uploaded.splice(j, 1);
            list.splice(i, 1);
        }
    });

    output.appendChild(createHeader("Unused Images"));
    uploaded.forEach(file => output.appendChild(createImage("/img/Home/" + file)));

    output.appendChild(createHeader("Images not Found"));
    let p = document.createElement("p");
    list.forEach(img => p.innerHTML += img.src + "<br />");
    output.appendChild(p);
}

const createHeader = string => {
    let div = document.createElement("div");
    let header = document.createElement("h5");
    header.innerText = string;
    div.appendChild(createLine());
    div.appendChild(header);
    return div;
}

const createImage = image => {
    let figure = document.createElement("figure");
    figure.className = "w-25";

    if(typeof image === "string") {
        let img = document.createElement("img");
        img.src = image;
        figure.appendChild(img);
    } else {
        figure.appendChild(image);
    }

    return figure;
}

const createLine = () => document.createElement("hr");

const upload = event => {
    let image = event.target.files[0];
    let body = new FormData();
    body.append('image', image);

    fetch('/img/Home', {
        method: 'POST',
        body: body
    }).then(res => {
        if(res.ok)
            location.reload();
        else
            throw new Error("Image Failed to upload!");
    }).catch(e => {
        console.error(e);
        window.alert("There was a problem uploading the image!")
    })
}
