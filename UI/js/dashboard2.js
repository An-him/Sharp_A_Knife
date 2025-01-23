  // Function to fetch orders from the server
  async function fetchOrders() {
    try {
      //const token = JSON.parse(localStorage.getItem('current_user')).accessToken;
          const response = await $.ajax({
              url: 'http://localhost:5000/orders/orders/', 
              method: 'GET',
              // headers: {
              //     'authorization': token, 
              //     'Content-Type': 'application/json',
              // },
          });
  
      // Populate the main content with fetched data
      console.log("response",response);
      ordersData = JSON.parse(response)
      console.log("orders",ordersData);

      ordersCount = $('#order-count');
      ordersCount.text( ordersData ? ordersData.length : 0 );

      const buildTableBody = () => {
          // const recentOrderData = RECENT_ORDER_DATA;
         
           const tbody = document.createElement("tbody");
         let i = 1;
           let bodyContent = "";
           for (const row of orderData) {
             bodyContent += `
               <tr>
                 <td>${i++}</td>
                 <td>${row.name}</td>
                 <td>${row.email}</td>
                 
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

$(document).ready(async function () {
    const preloader = $('#preloader');
    const mainContent = $('#mainContent');
    // const dataContainer = $('#data');
    const dateInput = $('#date');
    dateInput.val(new Date().toISOString().split('T')[0]);
    console.log(dateInput, dateInput.value);
    
  
    
    // Fetch data and hide preloader when done
    await fetchOrders();
    
    
    // Hide preloader and show main content
    preloader.hide();
    mainContent.css('display','grid');
    });
    