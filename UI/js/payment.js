var quantity = JSON.parse(localStorage.getItem('numberKnives'));
var price = quantity * 10
console.log(quantity, price);
document.getElementById('number-knives').textContent = quantity;
document.getElementById('knives-price').textContent = price;
document.getElementById('knives-total').textContent = price;

$(document).ready(function() {
    $('#checkout-form').on('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
      
      // Serialize form data
      var formData = $(this).serialize();
      
      // Perform AJAX request
      $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/orders/orders/', // Replace with your server endpoint
        data: formData,
        success: function(response) {
          // Handle success response
          alert('Payment successful!');
          // Redirect or update the page as needed
        },
        error: function(error) {
          // Handle error response
          alert('An error occurred during checkout. Please try again.');
        }
      });
    });
  });


/**
 * $(document).ready(async function () {
  const preloader = $('#preloader');
  const mainContent = $('#mainContent');
  const dataContainer = $('#data');

  // Function to fetch data from the server
  async function fetchData() {
    try {
      const response = await $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts/1', // Example API endpoint
        method: 'GET',
      });

      // Populate the main content with fetched data
      dataContainer.html(`
        <h2>${response.title}</h2>
        <p>${response.body}</p>
      `);
    } catch (error) {
      dataContainer.html(`<p style="color: red;">Error fetching data: ${error.statusText}</p>`);
    }
  }

  // Fetch data and hide preloader when done
  await fetchData();

  // Hide preloader and show main content
  preloader.hide();
  mainContent.show();
});

 */