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
    $('#contact-btn').text("Processing...");

    $.ajax({
        type: 'POST',
        url:  'https://team-furebo-e-commerce-bn.onrender.com/api/login',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(response) {
            alert('Payment successful!');
            $('#payment-btn').text("Payemnt Successful!");
            $('#payment-btn').css("color","green");
        },
        error: function(error) {
            alert('An error occurred during checkout. Please try again.');
            $('#payment-btn').text("Something went wrong");
            $('#payment-btn').css("color","yellow"); 
        }
      });
    });
  });