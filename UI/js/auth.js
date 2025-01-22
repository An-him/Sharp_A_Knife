$(document).ready(function() {
    $('#login-btn').on('click', function() {
      $('#login-form').removeClass('hidden');
      $('#signup-form').addClass('hidden');
      $(this).addClass('active');
      $('#signup-btn').removeClass('active');
    });
  
    $('#signup-btn').on('click', function() {
      $('#signup-form').removeClass('hidden');
      $('#login-form').addClass('hidden');
      $(this).addClass('active');
      $('#login-btn').removeClass('active');
    });

    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        var formData = {
            email: $('#login-email').val(),
            password: $('#login-password').val(),
        };
        $('#payment-btn').text("Something went wrong");
        $('#payment-btn').css("color","yellow");
    
        $.ajax({
            type: 'POST',
            url:  'http://localhost:5000/auth/login',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                alert('login successful!');
                location.href = "dashboard.html"
            },
            error: function(error) {
                alert('An error occurred during checkout. Please try again.'); 
            }
          });
        });
        
    $('#signup-form').on('submit', function(event) {
        event.preventDefault();
        var formData = {
            fullname: $('#signup-name').val(),
            email: $('#signup-email').val(),
            password: $('#signup-password').val(),
        };
    
        $.ajax({
            type: 'POST',
            url:  'http://localhost:5000/auth/signup',
            
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                alert('SingUp successful! Please Proceed to login');
            },
            error: function(error) {
                alert('An error occurred during checkout. Please try again.'); 
            }
            });
        });
  });
  