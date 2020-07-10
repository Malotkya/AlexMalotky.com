const init = () => {
    document.querySelectorAll(".deleteSchool").forEach(button => {
        button.addEventListener("click", deleteSchool);
    });

    document.querySelectorAll(".deleteJob").forEach(button => {
        button.addEventListener("click", deleteJob);
    });

    document.querySelectorAll(".editSchool").forEach(button => {
        button.addEventListener("click", editSchool);
    });

    document.querySelectorAll(".editJob").forEach(button => {
        button.addEventListener("click", editJob);
    });

    document.querySelector("#schoolForm").addEventListener("submit", sendSchool);


}; window.onload = init;

const deleteSchool = event => {
    let id = event.target.attributes.schoolid.nodeValue;
    let target = document.querySelector(`#school${id}`);

    console.log("Delete: " + target.querySelector(".name").innerText);
}

const deleteJob = event => {
    let id = event.target.attributes.jobid.nodeValue;
    let target = document.querySelector(`#job${id}`);

    console.log("Delete: " + target.querySelector(".location").innerText);
}

const editSchool = event => {
    let id = event.target.attributes.schoolid.nodeValue;
    let target = document.querySelector(`#school${id}`);
    let form = document.querySelector("#schoolForm");

    form.querySelector("#name").value = target.querySelector(".name").innerText;
    form.querySelector("#degree").value = target.querySelector(".degree").innerText;
    form.querySelector("#gpa").value = target.querySelector(".gpa").innerText;
    form.querySelector("#graduated").value = new Date(target.querySelector(".graduated").innerText);
    form.querySelector("#comments").value = target.querySelector(".comments").innerText;
    form.querySelector("#schoolId").value = id;
    form.querySelector("#submitSchool").value = "Edit School";
}

const editJob = event => {
    let id = event.target.attributes.jobid.nodeValue;
    let target = document.querySelector(`#job${id}`);

    console.log("Edit: " + target.querySelector(".location").innerText);
}

const sendSchool = event => {
    let form = event.target;
    event.preventDefault();

    let formData = new FormData(form);

    let body = {
        id: form.querySelector("#schoolId").value,
        name: form.querySelector("#name").value,
        degree: form.querySelector("#degree").value,
        gpa: form.querySelector("#gpa").value,
        graduated: form.querySelector("#graduated").value,
        comments: form.querySelector("#comments").value
    };

    let action = "Update";
    if(body.id == "")
        action = "New";

    fetch(`/Admin/School/${action}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(body)
    }).then(responce => {
        if( !responce.ok )
            throw new Error(responce.body);

        window.location.replace("/Admin/School");
    }).catch(error => {
        console.error(error);
    });
}
