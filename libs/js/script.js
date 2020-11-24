
$(document).ready(function() {
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: 'POST',
    dataType: 'json',
    
    success: function(result) {
      result['data'].forEach(element => {
        $('#department-select').append($('<option>', {
          value: element['name'],
          text: `${element['name']}`
        }))
       });


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 


$('#name-btn').on('click',function() {

  $.ajax({
    url: "libs/php/getEmployeeByName.php",
    type: 'POST',
    dataType: 'json',
    data: {
      firstName: $('#employee-name-search').val()
    },
    
    success: function(result) {
   
      console.log(result['data']);

    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 