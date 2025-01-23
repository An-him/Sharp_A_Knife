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
        House_number: $('#House_number').val(),
        phone_number: $('#phone_number').val(),
        zip: $('#zip').val(),
        cardname: $('#cname').val(),
        cardnumber: $('#ccard').val(),
        expmonth: $('#expmonth').val(),
        expyear: $('#expyear').val(),
        cvv: $('#cvv').val(),
        quantity: quantity,
    };
    
    $('#payment-btn').val("Processing...");
    
    $.ajax({
        type: 'POST',
        url:  'http://localhost:5000/orders/orders/',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(response) {
            alert('Payment successful!');
            $('#payment-btn').val("Payemnt Successful!");
            $('#payment-btn').css("color","green");
        },
        error: function(error) {
            alert('An error occurred during checkout. Please try again.');
            $('#payment-btn').val("Something went wrong");
            $('#payment-btn').css("color","yellow"); 
        }
      });
    });
  });