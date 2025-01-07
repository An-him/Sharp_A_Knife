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