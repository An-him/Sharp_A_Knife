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
          fullname: $('#fullname').val(),
          email: $('#email').val(),
          title: $('#title').val(),
          message: $('#message').val(),
      };
      $('#contact-btn').text("Sending...");      

      $.ajax({
          type: 'POST',
          url:  'http://localhost:5000/contact/contact/',
          data: JSON.stringify(formData),
          contentType: 'application/json',
          success: function(response) {
              alert('Message sent! We will get back to you shortly');
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