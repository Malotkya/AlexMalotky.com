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
    document.querySelector("#jobForm").addEventListener("submit", sendJob);

}; window.onload = init;

const deleteSchool = event => {
    let id = event.target.attributes.schoolid.nodeValue;
    let target = document.querySelector(`#school${id}`);

    if( confirm(`Are you sure you want to delete: ${target.querySelector(".name").innerText}`) ) {
        fetch("/Admin/School/Delete", {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({id:id})
        }).then(responce => {
            if( !responce.ok )
                throw new Error(responce.body);

            window.location.replace("/Admin/School");
        }).catch(error => {
            console.error(error);
        });
    }
}

const deleteJob = event => {
    let id = event.target.attributes.jobid.nodeValue;
    let target = document.querySelector(`#job${id}`);

    if( confirm(`Are you sure you want to delete: ${target.querySelector(".location").innerText}`) ) {
        fetch("/Admin/Job/Delete", {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({id:id})
        }).then(responce => {
            if( !responce.ok )
                throw new Error(responce.body);

            window.location.replace("/Admin/Job");
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

const sendSchool = event => {
    let form = event.target;
    event.preventDefault();

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

const sendJob = event => {
    let form = event.target;
    event.preventDefault();

    let body = {
        id: form.querySelector("#jobId").value,
        location: form.querySelector("#location").value,
        startDate: form.querySelector("#startDate").value,
        endDate: form.querySelector("#endDate").value,
        title: form.querySelector("#title").value,
        description: form.querySelector("#description").value
    };

    let action = "Update";
    if(body.id == "")
        action = "New";

    fetch(`/Admin/Job/${action}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(body)
    }).then(responce => {
        if( !responce.ok )
            throw new Error(responce.body);

        window.location.replace("/Admin/Job");
    }).catch(error => {
        console.error(error);
    });
}
