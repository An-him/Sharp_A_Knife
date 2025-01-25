// Function to fetch Orders from the server
async function fetchOrders() {
    try {
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
      ordersData = response
      console.log("orders",ordersData);

      ordersCount = $('#order-count');
      ordersCount.text( ordersData ? ordersData.length : 0 );

      fetchData = () => {
        // empty the contents of the table
        tfoot.innerHTML = '';
        tbody.innerHTML = '';
        // reinitialize/reset/update the value of data array
        data = ordersData
        console.log("data", data);
        // Displaying the total number of products 
        dataCount.textContent = data ? data.length : 0;
        // userCount.textContent = data ? data.length : 0;
        // assert the data array is not empty
        if(data != null && data.length > 0){
            // loop through the data array and display the data in the table
            data.map((item, i) => {
                // displaying the data in the body of the table
                tbody.innerHTML += `<tr>
                    <td>${++i}</td>
                    <td>${item.date_created_at.split('T')[0]}</td>
                    <td>${item.fullname}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td style="width:175px;">${item.address}</td>
                    <td>${item.quantity}</td>
                    <td style="width: 150px;">
                    <button type="button" id="btnEditProduct" onclick="previewUpdate(${--i});">Reply</button>
                        <button type="button" id="btnDeleteProduct" onclick="deleteOrder(${--i});">Delete</button>
                    </td>                
                </tr>`;
            });
        }
        else{
            // displaying to user that there is no data to show using the tfoot element
            tfoot.innerHTML = `<tr>
                        <td colspan="7"><h1 style="background: #f1f1f1; color: #f00; text-align: center; padding: 40px;">No data to show</h1></td>
                    </tr>
            `;
        }
    };

    } catch (error) {

      console.log("Error",error);
      // dataContainer.html(`<p style="color: red;">Error fetching data: ${error.statusText}</p>`);
      tfoot.innerHTML = `<tr>
                        <td colspan="7"><h1 style="background: #f1f1f1; color: #f00; text-align: center; padding: 40px;">No data to show</h1></td>
                    </tr>
            `;
    }
    fetchData()
  }



// Function to delete order from the server
async function deleteOrder(i) {
    console.log(i);
    
if(confirm('Are you sure you want to delete this order?')){
try {
    
    const token = JSON.parse(localStorage.getItem('current_user')).access_token;
        const response = await $.ajax({
            url: `http://localhost:5000/orders/orders/${data[++i].id}`, 
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer "+token, 
                'Content-Type': 'application/json',
            },
        });

        location.reload()

} catch (error) {

    console.log("Error",error);
    // dataContainer.html(`<p style="color: red;">Error fetching data: ${error.statusText}</p>`);
}
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
    tbody = document.querySelector('tbody'),
    tfoot = document.querySelector('tfoot'),
    
    
    
    // Fetch data and hide preloader when done
    await fetchOrders();
    
    
    // Hide preloader and show main content
    preloader.hide();
    mainContent.css('display','grid');
    });
    