// Function to fetch data from the server
async function fetchMessages() {
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

      fetchData = () => {
        // empty the contents of the table
        tfoot.innerHTML = '';
        tbody.innerHTML = '';
        // reinitialize/reset/update the value of data array
        data = JSON.parse(localStorage.getItem('contactData'));
        console.log(data);
        // Displaying the total number of products 
        dataCount.textContent = data ? data.length : 0;
        userCount.textContent = data ? data.length : 0;
        // assert the data array is not empty
        if(data != null && data.length > 0){
            // loop through the data array and display the data in the table
            data.map((item, i) => {
                // displaying the data in the body of the table
                tbody.innerHTML += `<tr>
                    <td>${++i}</td>
                    <td>${item.createdAt.split('T')[0]}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.subject}</td>
                    <td style="width:175px;">${item.message}</td>
                    <td style="width: 150px;">
                    <button type="button" id="btnEditProduct" onclick="previewUpdate(${--i});">Reply</button>
                        <button type="button" id="btnDeleteProduct" onclick="deleteProduct(${--i});">Delete</button>
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
    await fetchMessages();
    
    
    // Hide preloader and show main content
    preloader.hide();
    mainContent.css('display','grid');
    });
    