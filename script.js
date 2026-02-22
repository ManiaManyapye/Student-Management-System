const API = "http://localhost:3000/students";

function fetchStudents() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("students");
            list.innerHTML = "";
            data.forEach(student => {
                list.innerHTML += `
                <li>
                    ${student.name} - ${student.course}
                    <button onclick="deleteStudent(${student.id})">X</button>
                </li>`;
            });
        });
}

function addStudent() {
    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course })
    }).then(() => fetchStudents());
}

function deleteStudent(id) {
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(() => fetchStudents());
}

fetchStudents();