
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
      $('#employee-info-area').html('');
      const employeeCardHTML = `
      <div class="card">
      <div class="card-body">
        <h5 class="card-title">${employee.firstName} ${employee.lastName}</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      </div>`

      $('#employee-info-area').append(employeeCardHTML);


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
      $('#employee-info-area').html('');
      // $('#department-title').html('');
      console.log(result['data']);
      result['data'].forEach(employee => {
        const employeeHTML = `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${employee.firstName} ${employee.lastName}</h5>
          <ul>
            <li>Email: ${employee.email}</li>
            <li>Job Title: ${employee.jobTitle}</li>
            <li>Department: ${employee.department}</li>
            <li>Location: ${employee.location}</li>
          </ul>
        </div>
        
      </div>`
       $('#employee-info-area').append(employeeHTML);
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