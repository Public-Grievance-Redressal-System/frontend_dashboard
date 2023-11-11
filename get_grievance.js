let departments = [];
function fetchDepartments() {
    // Fetch the list of departments from the API
    return axios.get('http://localhost:8082/department')
                .then(response => {
                    departments = response.data;
                    // Populate the <select> element with department options
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
function getDepartmentName(departmentId) {
    const department = departments.find(dep => dep.id === departmentId);
    return department ? department.name : 'Unknown Department';
}
function fetchGrievances(){
    const grievanceTable = document.getElementById('grievance_table');

    // Fetch the list of grievances from the API using Axios
    axios.get('http://localhost:8081/grievance')
        .then(response => {
            // Populate the table with grievance data
            response.data.forEach((grievance,index) => {
                const row = document.createElement('tr');
                row.className = 'tableData';

                const columns = [
                    index+1,
                    grievance.title,
                    grievance.body,
                    getDepartmentName(grievance.departmentId),
                    formatDate(grievance.creationDate),
                    grievance.status
                ];

                columns.forEach(columnData => {
                    const cell = document.createElement('td');
                    cell.textContent = columnData;
                    row.appendChild(cell);
                });

                grievanceTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching grievances:', error));
}

// Function to format date as DDMMYYYY
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
}
document.addEventListener('DOMContentLoaded', () => {
    fetchDepartments().then(fetchGrievances);
});

fetchDataFromCookies();