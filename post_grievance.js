function fetchDepartments() {
    const departmentSelect = document.getElementById('department');

    // Fetch the list of departments from the API
    axios.get('http://localhost:8082/department')
                .then(response => {
                    // Populate the <select> element with department options
                    response.data.forEach(department => {
                        const option = document.createElement('option');
                        option.value = department.id;
                        option.text = department.name;
                        departmentSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching departments:', error));
}
let userRole ; 
let userEmail;
function fetchDataFromCookies(){
    userRole = Cookies.get('userRole');
    userEmail = Cookies.get('email');
    // Check if the cookies exist and log their values
    if (userRole !== undefined && userEmail !== undefined) {
        console.log('User Role:', userRole);
        console.log('User Email:', userEmail);
    } else {
        console.log('Cookies not found or expired.');
    }
    setRoleAndUserName();
}
function setRoleAndUserName(){
    const userRoleElement = document.getElementById('user_role');
    const userNameElement = document.getElementById('user_name');
    if (userRole !== undefined && userEmail !== undefined) {
        userRoleElement.textContent = userRole;
        userNameElement.textContent = userEmail;
    } else {
        // Handle the case when cookies are not found or expired
        console.log('Cookies not found or expired.');
        // You might want to redirect the user to the login page or show an error message
    }
}
function logout() {
    // Remove the user-related cookies
    Cookies.remove('userRole');
    Cookies.remove('email');
    console.log("Cookies cleared");
    // Optionally, redirect to the login page or perform other actions
    window.location.href = 'index.html';
}

function createGrievance() {
    // Get values from the input fields
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const department = document.getElementById('department').value;

    // Make a POST request to create a grievance
    axios.post('http://localhost:8081/grievance', {
        title: title,
        body: description,
        departmentId: department
    })
    .then(response => {
        console.log('Grievance created successfully:', response.data);
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        alert("Grievance Posted Successfully");
        // You can add additional logic here, e.g., redirect to another page
    })
    .catch(error => console.error('Error creating grievance:', error));
}
fetchDepartments();
fetchDataFromCookies();