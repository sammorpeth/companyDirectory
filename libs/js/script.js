
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
   
      const employee = result['data'][0];
      $('#results').html('');
      const employeeCardHTML = `
        <div class="col-12 col-lg-6 shadow-sm p-3 mb-3 bg-white rounded">
          <div class="row"></div>
        </div>`

      $('#results').append(employeeCardHTML);


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 


$('#department-select').on('change',function() {

  $.ajax({
    url: "libs/php/getAllByDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      department: $('#department-select').val()
    },
    
    success: function(result) {
      $('#results').html('');
      // $('#department-title').html('');
      console.log(result['data']);
      result['data'].forEach(employee => {
        const employeeHTML = `<div class="col-12 col-lg-6 shadow-sm p-3 mb-3 bg-white rounded">
                                <div class="row">
                                  <h5 >${employee.firstName} ${employee.lastName}</h5>
                                    <ul>
                                      <li>Email: ${employee.email}</li>
                                      <li>Job Title: ${employee.jobTitle}</li>
                                      <li>Department: ${employee.department}</li>
                                      <li>Location: ${employee.location}</li>
                                    </ul>
                                  </div>
                                </div>
                                `
       $('#results').append(employeeHTML);
      })
      $('#department-title').html($('#department-select').val());


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 