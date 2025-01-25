  // Function to fetch orders from the server
  async function fetchOrders() {
    try {
      console.log(localStorage.getItem('current_user'));
      console.log(JSON.parse(localStorage.getItem('current_user')).access_token);
      const token = JSON.parse(localStorage.getItem('current_user')).access_token;
          const response = await $.ajax({
              url: 'http://localhost:5000/orders/orders/', 
              method: 'GET',
              headers: {
                  'Authorization': "Bearer "+token, 
                  'Content-Type': 'application/json',
              },
          });
  
      // Populate the main content with fetched data
      console.log("response",response);
      const ordersData = response;
      console.log("orders", ordersData);

      ordersCount = $('#order-count');
      $('#order-count-side').text( ordersData ? ordersData.length : 0 );
      $('#order-count').text( ordersData ? ordersData.length : 0 );

      const buildTableBody = () => {
          // const recentOrderData = RECENT_ORDER_DATA;
         
           const tbody = document.createElement("tbody");
         let i = 1;
           let bodyContent = "";
           for (const row of ordersData) {
             bodyContent += `
               <tr>
                 <td>${i++}</td>
                 <td>${row.fullname}</td>
                 <td>${row.email}</td>
                 <td>${row.quantity}</td>
                 <td>${row.date_created_at.split('T')[0]}</td>
                 <td class="primary">Details</td>
               </tr>
             `;
           }
         
           tbody.innerHTML = bodyContent;
         
           return tbody;
         };
         document.getElementById("recent-orders--table").appendChild(buildTableBody());

    } catch (error) {

      console.log("Error",error);
      // dataContainer.html(`<p style="color: red;">Error fetching data: ${error.statusText}</p>`);
    }
  }

  // Function to fetch orders from the server
  async function fetchMessages() {
    try {
      const token = JSON.parse(localStorage.getItem('current_user')).accessToken;
          const response = await $.ajax({
              url: 'http://localhost:5000/contact/contact/', 
              method: 'GET',
              headers: {
                  'authorization': token, 
                  'Content-Type': 'application/json',
              },
          });
  
      // Populate the main content with fetched data
      console.log("contact response",response);
      contactData = response

      $('#contact-count-side').text( contactData ? contactData.length : 0 );
      $('#contact-count').text( contactData? contactData.length : 0 );

    } catch (error) {
      
      console.log("Error",error);
    }
  } 
  
  // Function to fetch Users from the server
  async function fetchUsers() {
    try {
      const token = JSON.parse(localStorage.getItem('current_user')).accessToken;
          const response = await $.ajax({
              url: 'http://localhost:5000/users/users/', 
              method: 'GET',
              headers: {
                  'authorization': token, 
                  'Content-Type': 'application/json',
              },
          });
  
      // Populate the main content with fetched data
      console.log("user response",response);
      usersData = response

      $('#users-count-side').text( usersData ? usersData.length : 0 );
      $('#users-count').text( usersData? usersData.length : 0 );

    } catch (error) {
      
      console.log("Error",error);
    }
  }

//Logout User
Logout=()=>{
  localStorage.removeItem('current_user')
}

$(document).ready(async function () {
    const preloader = $('#preloader');
    const mainContent = $('#mainContent');
    // const dataContainer = $('#data');
    const dateInput = $('#date');
    dateInput.val(new Date().toISOString().split('T')[0]);
    
  
    
    // Fetch data and hide preloader when done
    await fetchOrders();
    await fetchMessages();
    await fetchUsers();
    
    
    // Hide preloader and show main content
    preloader.hide();
    mainContent.css('display','grid');
    });
    