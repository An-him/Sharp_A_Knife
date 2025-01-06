var quantity = JSON.parse(localStorage.getItem('numberKnives'));
var price = quantity * 10
console.log(quantity, price);
document.getElementById('number-knives').textContent = quantity;
document.getElementById('knives-price').textContent = price;
document.getElementById('knives-total').textContent = price;

$(document).ready(function() {
  $('#checkout-form-payment').on('submit', function(event) {
    event.preventDefault();
    var formData = {
        fullname: $('#fname').val(),
        email: $('#email').val(),
        address: $('#address').val(),
        city: $('#city').val(),
        state: $('#state').val(),
        zip: $('#zip').val(),
        cardname: $('#cname').val(),
        cardnumber: $('#ccard').val(),
        expmonth: $('#expmonth').val(),
        expyear: $('#expyear').val(),
        cvv: $('#cvv').val(),
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/orders/orders/', // Replace with your server endpoint
        data: formData,
        success: function(response) {
            alert('Payment successful!');
        },
        error: function(error) {
            alert('An error occurred during checkout. Please try again.'); 
        }
      });
    });
  });