
const formatEmployeeInfo = (employee) => {
    const employeeHTML = `<div class="col-12 col-lg-6 shadow-sm p-3 mb-3 rounded employee-card">
                            <h5 >${employee.firstName} ${employee.lastName}</h5>
                            <p id="employee-id" hidden>${employee.id}</p>

                            <ul>
                              <li>Email: ${employee.email}</li>
                              <li>Job Title: ${employee.jobTitle}</li>
                              <li>Department: ${employee.department}</li>
                              <li>Location: ${employee.location}</li>
                              <button type="button" class="btn btn-primary" id="edit-btn" data-toggle="modal" data-target="#editProfileModal">Edit</button>
                            </ul>
                          </div>
                          `

    $('#edit-btn').on('click', () => {getInfoById(employee.id)})                        
    
  return employeeHTML;
}

const getInfoById = (id) => {
  $.ajax({
    url: "libs/php/getEmployeeById.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: id
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
}

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

  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: 'POST',
    dataType: 'json',
    
    success: function(result) {
      result['data'].forEach(element => {
        $('#location-select').append($('<option>', {
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

  $.ajax({
    url: "libs/php/getAll.php",
    type: 'POST',
    dataType: 'json',
    
    success: function(result) {
      
      $('#department-title').html('');
      console.log(result['data']);
      result['data'].forEach(employee => {
        const employeeHTML = formatEmployeeInfo(employee);
       $('#results').append(employeeHTML);
      })


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 


$('#name-btn').on('click',function() {
  console.log('hi');

  $.ajax({
    url: "libs/php/getEmployeeByName.php",
    type: 'POST',
    dataType: 'json',
    data: {
      firstName: $('#employee-name-search').val()
    },
    
    success: function(result) {
      console.log(result['data'][0])
      const employee = result['data'][0];
      $('#results').html('');
      const employeeCardHTML = formatEmployeeInfo(employee);

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
      $('#department-title').html('');
      console.log(result['data']);
      result['data'].forEach(employee => {
        const employeeHTML = formatEmployeeInfo(employee);
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


$('#location-select').on('change',function() {

  $.ajax({
    url: "libs/php/getAllByLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      location: $('#location-select').val()
    },
    
    success: function(result) {
      $('#results').html('');
      $('#department-title').html('');
      console.log(result['data']);
      result['data'].forEach(employee => {
        const employeeHTML = formatEmployeeInfo(employee);
       $('#results').append(employeeHTML);
      })
      $('#department-title').html($('#location-select').val());


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 

$('#edit-icon').on('click', function() {
  console.log('hi');
})
