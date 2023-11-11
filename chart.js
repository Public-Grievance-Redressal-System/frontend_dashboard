let myChart;
function formatDate(date) {
    // Input date in the format "YYYYMMDD"
    // Example: yyyyMMdd = "2023-11-02" (November 2, 2023)

    // Extract year, month, and day from the input string
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    // Create a new formatted date string in the "DDMMYYYY" format
    const formattedDate = `${day}${month}${year}`;

    return formattedDate;
}
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');
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
                    // Adding All Departments option
                    const option = document.createElement('option');
                        option.value = "";
                        option.text = "All";
                        departmentSelect.appendChild(option);
                })
                .catch(error => console.error('Error fetching departments:', error));
}
// Set the formatted date as the value of the date input
document.getElementById('startdate').value = `${year}-${month-1}-${day}`;
document.getElementById('enddate').value = `${year}-${month}-${day}`;
async function fetchDataAndPlotChart() {
    try {
        if (myChart) {
            myChart.destroy();
        }
        const token = "ADMIN 5ed94f67-097b-49ca-b579-b5c8afeaee7a"
        const startdate = formatDate(document.getElementById("startdate").value);
        const enddate = formatDate(document.getElementById("enddate").value);
        const range_frequency = document.getElementById("range_frequency").value;
        const ticket_status = document.getElementById("ticket_status").value;
        const metric_type = document.getElementById("metric_type").value;
        let chart_label = "";
        let url = `http://localhost:8080/api/v1/analytics/metrics/`;
        if(metric_type=="TICKETS"){
            url+=`tickets`;
            chart_label = `TICKETS ${ticket_status}`;
        }
        else{
            url+=`average-resolution-time`;
            chart_label = `Average Resolution Time for ${ticket_status} tickets in mins`;
        }
        url+=`?from=${startdate}&to=${enddate}&rangeFrequency=${range_frequency}&status=${ticket_status}`;
        const response = await axios.get(url
        ,{ headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(response.data);

        // Extract data for the chart
        const dates = Object.keys(response.data);
        const values = Object.values(response.data);
        // console.log(dates);
        // console.log(values);
        const ctx = document.getElementById('line');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: chart_label,
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            }
        });
    } catch (error) {
        console.error(error);
    }
}

// Call the function to fetch data and plot the chart
fetchDepartments();
fetchDataAndPlotChart();
fetchDataFromCookies();

