window.onload = () => {
    document.querySelectorAll(".deleteSchool")
            .forEach(button => button.addEventListener("click", deleteSchool));

    document.querySelectorAll(".deleteJob")
            .forEach(button => button.addEventListener("click", deleteJob));

    document.querySelectorAll(".editSchool")
            .forEach(button => button.addEventListener("click", editSchool));

    document.querySelectorAll(".editJob")
            .forEach(button => button.addEventListener("click", editJob));

    init();
}

const deleteSchool = event => {
    let id = event.target.attributes.schoolid.nodeValue;
    let target = document.querySelector(`#school${id}`);

    if( confirm(`Are you sure you want to delete: ${target.querySelector(".name").innerText}`) ) {
        fetch("/Admin/School/", {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({id:id})
        }).then(responce => {
            if( !responce.ok )
                throw new Error(responce.body);
            else
                window.location.href = "/Admin/School";
        }).catch(error => {
            console.error(error);
        });
    }
}

const deleteJob = event => {
    let id = event.target.attributes.jobid.nodeValue;
    let target = document.querySelector(`#job${id}`);

    if( confirm(`Are you sure you want to delete: ${target.querySelector(".location").innerText}`) ) {
        fetch("/Admin/Job/", {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({id:id})
        }).then(responce => {
            if( !responce.ok )
                throw new Error(responce.body);
            else
                window.location.href = "/Admin/Job";
        }).catch(error => {
            console.error(error);
        });
    }

}

const editSchool = event => {
    let id = event.target.attributes.schoolid.nodeValue;
    let target = document.querySelector(`#school${id}`);
    let form = document.querySelector("#schoolForm");

    let buffer = target.querySelector(".graduated").innerText;
    if( buffer == "") {
        form.querySelector("#graduated").value = "";
    } else {
        form.querySelector("#graduated").value = new Date(buffer).toISOString().split('T')[0];
    }

    form.querySelector("#name").value = target.querySelector(".name").innerText;
    form.querySelector("#degree").value = target.querySelector(".degree").innerText;
    form.querySelector("#gpa").value = target.querySelector(".gpa").innerText;
    form.querySelector("#comments").value = target.querySelector(".comments").innerText;
    form.querySelector("#schoolId").value = id;
    form.querySelector("#submitSchool").value = "Edit School";
}

const editJob = event => {
    let id = event.target.attributes.jobid.nodeValue;
    let target = document.querySelector(`#job${id}`);
    let form = document.querySelector("#jobForm");

    let buffer = target.querySelector(".startDate").innerText;
    if(buffer == "") {
        form.querySelector("#startDate").value = "";
    } else {
        form.querySelector("#startDate").value = new Date(buffer).toISOString().split('T')[0];
    }

    buffer = target.querySelector(".endDate").innerText;
    if(buffer == "") {
        form.querySelector("#endDate").value = "";
    } else {
        form.querySelector("#endDate").value = new Date(buffer).toISOString().split('T')[0];
    }


    form.querySelector("#location").value = target.querySelector(".location").innerText;
    form.querySelector("#title").value = target.querySelector(".title").innerText;
    form.querySelector("#description").value = target.querySelector(".description").innerText;
    form.querySelector("#jobId").value = id;
    form.querySelector("#submitJob").value = "Edit Job";
}
