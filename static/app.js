function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (let i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1; 
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (let i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1; 
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft").value;
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "/predict_home_price";

  $.post(url, {
    total_sqft: parseFloat(sqft),
    bhk: bhk,
    bath: bathrooms,
    location: location
  })
  .done(function(data) {
    console.log(data.estimated_price);
    estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
  })
  .fail(function(error) {
    console.error("Error:", error);
  });
}

function onPageLoad() {
  console.log("document loaded");
  var url = "/get_location_names";

  $.get(url)
  .done(function(data) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      locations.forEach(function(loc) {
        var opt = new Option(loc);
        $('#uiLocations').append(opt);
      });
    }
  })
  .fail(function(error) {
    console.error("Error:", error);
  });
}

window.onload = onPageLoad;

const anchors = document.querySelectorAll('a[href^="#"]');
        const handleAnchorClick = function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };
        anchors.forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick);
        });