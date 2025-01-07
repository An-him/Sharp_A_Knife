function updateKnifeCount(value) {
    document.getElementById('knifeCount').textContent = value;
    document.getElementById('price').textContent= value*10;
  }


  function placeOrder() {
    var numberKnives = document.getElementById('knifeCount').textContent;
    console.log(numberKnives);
    localStorage.setItem('numberKnives', JSON.stringify(numberKnives));
    location.href="pages/payment.html"
  }
  
  $(document).ready(function() {
    $('#contact-form').on('submit', function(event) {
      event.preventDefault();

      var formData = {
          name: $('#name').val(),
          email: $('#email').val(),
          message: $('#message').val(),
      };
      $('#contact-btn').text("Sending...");      

      $.ajax({
          type: 'POST',
          url:  'https://team-furebo-e-commerce-bn.onrender.com/api/login',
          data: JSON.stringify(formData),
          contentType: 'application/json',
          success: function(response) {
              alert('Payment successful!');
              $('#contact-btn').text("Sent!");
              $('#contact-btn').css("color","green");
          },
          error: function(error) {
              alert('An error occurred during checkout. Please try again.');
              $('#contact-btn').text("Error");
              $('#contact-btn').css("color","yellow");             
          }
        });
      });
    });