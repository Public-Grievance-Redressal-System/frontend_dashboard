function fetchDepartments() {
    const departmentSelect = document.getElementById('create_department');

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
function fetchRoles() {
    const departmentSelect = document.getElementById('create_role');

    // Fetch the list of departments from the API
    return axios.get('http://localhost:8082/role')
                .then(response => {
                    // Populate the <select> element with role options
                    response.data.forEach(role => {
                        const option = document.createElement('option');
                        option.value = role
                        option.text = role;
                        departmentSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching roles:', error));
}
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Make a POST request to the login API
    axios.post('http://localhost:8082/login', { email, password })
        .then(response => {
            // Assuming the API returns a token
            const userRole = response.data.userRole;
            const email = response.data.email;
            console.log(userRole);
            console.log(email);
            // Store the token in a cookie with an expiration time
            Cookies.set('userRole', userRole, { expires: 7 }); // Expires in 7 days
            Cookies.set('email', email, { expires: 7 }); // Expires in 7 days
            // Redirect to another page or perform other actions
            if(userRole=="DEPT_ADMIN")
            window.location.href = 'dashboard.html';
            else
            window.location.href = 'create_grievance.html';
        })
        .catch(error => {
            console.error('Login failed:', error);
            alert(error.message);
            // Handle login failure, show error message, etc.
        });
}
function registerUser() {
    const username = document.getElementById('create_username').value;
    const email = document.getElementById('create_email').value;
    const phone = document.getElementById('create_phone').value;
    const password = document.getElementById('create_password').value;
    const address = document.getElementById('create_address').value;
    const role = document.getElementById('create_role').value;
    const department = document.getElementById('create_department').value;

    const userData = {
        name: username,
        email: email,
        phoneNumber: phone,
        password: password,
        address: address,
        userRole: role,
        departmentId: department
    };

    axios.post('http://localhost:8082/user', userData)
        .then(response => {
            console.log('User created successfully:', response.data);
            alert("User created Successfully")
            window.location.href = 'index.html';
            // Optionally, you can redirect to another page or perform other actions
        })
        .catch(error => {
            console.error('Error creating user:', error);
            // Handle the error, show an alert, etc.
        });
}
fetchRoles().then(fetchDepartments());