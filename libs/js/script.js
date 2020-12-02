// Format the HTML for the profile editing modal
const formatEditProfileModal = (employee) => {

  // Set the modal blank so it doesn't repeatedly add the HTML
  $('#current-employee-form').remove();
  const editProfileHTML = `<div id="current-employee-form">
                            <label for="current-employee-fname">First Name</label>
                            <input class="form-control" id="current-employee-fname" type="text" name="current-employee-fname" value="${employee.firstName}" required>
                            <label for="current-employee-lname">Last Name</label>
                            <input class="form-control" id="current-employee-lname" type="text" name="current-employee-lname" value="${employee.lastName}" required>
                            <label for="current-employee-job">Job Title</label>
                            <input class="form-control" id="current-employee-job" type="text" name="current-employee-job" value="${employee.jobTitle}" required>
                            <label for="current-employee-email">Email</label>
                            <input class="form-control" id="current-employee-email" type="email" name="current-employee-email" value="${employee.email}" required>
                            <label for="current-employee-location">Department</label>
                            <select class="custom-select" id="current-employee-department-select"></select>
                            <input id="current-employee-id" value="${employee.id}" hidden>

                           <div>`

  appendDepartmentsToSelects('#current-employee-department-select');


  $('#editProfileBody').append(editProfileHTML);
}

// Get employee info by ID
const getInfoById = (id) => {
  $.ajax({
    url: "libs/php/getEmployeeById.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: id
    },
    
    success: function(result) {
      const employee = result['data'][0];
      formatEditProfileModal(employee);
      console.log(result['data']);


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}

// Format the HTML for the profile editing modal 
const formatEmployeeInfo = (employee) => {

  let employeeHTML = $(`<div class="col-lg-5 shadow-sm p-3 mb-3 mr-2 rounded employee-card">
                      <h5 >${employee.firstName} ${employee.lastName}</h5>

                      <ul>
                        <li>Email: ${employee.email}</li>
                        <li>Job Title: ${employee.jobTitle}</li>
                        <li>Department: ${employee.department}</li>
                        <li>Location: ${employee.location}</li>
                        
                      </ul>
                    </div>
                    `);

  // Create HTML for edit button
  let editBtn = $(`<button type="button" class="btn btn-primary edit-btn"  data-toggle="modal" data-target="#editProfileModal">Edit</button>`);
  // Add to the end of the employee DIV
  employeeHTML.append(editBtn);

  // Add function which allows the relevant profile info to be added to the profile editing modal 
  editBtn.on('click', () => { getInfoById(employee.id); })
    
  return employeeHTML;
}

const appendDepartmentsToSelects = (selectName) => {
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: 'POST',
    dataType: 'json',
    
    success: function(result) {
      result['data'].forEach(element => {
        $(selectName).append($('<option>', {
          value: element['id'],
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
}

const appendLocationsToSelects = (selectName) => {
  $.ajax({
    url: `libs/php/getAllLocations.php`,
    type: 'POST',
    dataType: 'json',
    
    success: function(result) {
      result['data'].forEach(element => {
        $(selectName).append($('<option>', {
          value: element['id'],
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
}
const getAllEmployees = () => {
  $.ajax({
    url: "libs/php/getAll.php",
    type: 'POST',
    dataType: 'json',
    
    success: function(result) {
      // Reset results HTML so the page updates. 
      $('#results').html('');
      $('#department-title').html('');
      // console.log(result['data']);
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
  
}



// Initiates the page with select options etc. 
$(document).ready(function() {
  
  // Append options
  appendDepartmentsToSelects('#department-select');
  appendDepartmentsToSelects('#new-employee-department-select');
  appendDepartmentsToSelects('#edit-department-select');
  appendLocationsToSelects('#location-select');
  appendLocationsToSelects('#new-dpt-location-select');
  appendLocationsToSelects('#edit-location-select');

  // Append all the employees to the page on load
  getAllEmployees();
}); 

// Search functionality for user's first name
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

// Insert a new department through the edit departments modal
$('#insert-department-btn').on('click',function() {

  $.ajax({
    url: "libs/php/insertDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      name: $('#new-dpt-name').val(),
      locationID: $('#new-dpt-location-select').val(),

    },
    
    success: function(result) {
      $('#edit-department-message').html('<h4>Department succesfully added.</h4>');
      $('#edit-department-message').addClass('success');


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 

// Insert a new location through the edit locations modal
$('#insert-location-btn').on('click',function() {

  $.ajax({
    url: "libs/php/insertLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      name: $('#new-location-name').val(),
    },
    
    success: function(result) {
      console.log('hi');
      $('#edit-location-message').html('<h4>Location succesfully added.</h4>');
      $('#edit-location-message').addClass('success');

    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 

// Insert a new employee through the edit employee modal
$('#insert-employee-btn').on('click',function() {

  $.ajax({
    url: "libs/php/insertEmployee.php",
    type: 'POST',
    dataType: 'json',
    data: {
      firstName : $('#new-employee-fname').val(),
      lastName : $('#new-employee-lname').val(),
      jobTitle : $('#new-employee-job').val(),
      email : $('#new-employee-email').val(),
      departmentID : $('#new-employee-department-select').val(),
    },
    
    success: function(result) {

      $('#add-profile-message').html('<h4>Employee succesfully added.</h4>');
      $('#add-profile-message').addClass('success');


    },
    error: function(jqXHR, textStatus, errorThrown) {
      $('#add-profile-message').html("<h4>There's been an error. Please try again.</h4>");
      $('#add-profile-message').addClass('error');

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 
// ===== EDIT/DELETE entries ====== //

// Update current employees
$('#update-current-employee-btn').on('click', function() {
  $.ajax({
    url: "libs/php/updateCurrentEmployee.php",
    type: 'POST',
    dataType: 'json',
    data: {
      firstName : $('#current-employee-fname').val(),
      lastName : $('#current-employee-lname').val(),
      jobTitle : $('#current-employee-job').val(),
      email : $('#current-employee-email').val(),
      departmentID : $('#current-employee-department-select').val(),
      employeeID : $('#current-employee-id').val()
    },
    
    success: function(result) {
   
      $('#edit-profile-message').html('<h4>Profile succesfully changed.</h4>');
      $('#edit-profile-message').addClass('success');


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
  getAllEmployees();

});

// Edit departments
$('#edit-department-btn').on('click', function() {
  $.ajax({
    url: "libs/php/updateDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      dptName : $('#edit-department-name-input').val(),
      dptID : $('#edit-department-select').val()
      
    },
    
    success: function(result) {
   
      $('#edit-department-message').html('<h4>Department name succesfully changed.</h4>');
      $('#edit-department-message').addClass('success');


    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
});

// Delete departments
$('#delete-department-btn').on('click', function() {
  $.ajax({
    url: "libs/php/deleteDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
     
      departmentID : $('#edit-department-select').val()
      
    },
    
    success: function(result) {


    },
    error: function(jqXHR, textStatus, errorThrown) {
console.log('hi')
      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
});

// Delete locations
$('#delete-location-btn').on('click', function() {
  $.ajax({
    url: "libs/php/deleteLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
     
      locationID : $('#edit-location-select').val()
      
    },
    
    success: function(result) {
      $('#edit-location-message').html('<h4>Location deleted successfully.</h4>');
      $('#edit-location-message').addClass('success');


    },
    error: function(jqXHR, textStatus, errorThrown) {
console.log('hi')
      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
});

$('#edit-location-btn').on('click', function() {
  $.ajax({
    url: "libs/php/updateLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationName : $('#edit-location-name-input').val(),
      locationID : $('#edit-location-select').val()
      
    },
    
    success: function(result) {
   
      $('#edit-location-message').html('<h4>Location name succesfully changed.</h4>');
      $('#edit-location-message').addClass('success');


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
});

// List all of the employees in the selected department
$('#department-select').on('change',function() {

  $.ajax({
    url: "libs/php/getAllByDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      departmentID: $('#department-select').val()
    },
    
    success: function(result) {
      $('#results').html('');
      $('#department-title').html('');
      console.log(result['data']);
      result['data'].forEach(employee => {
        const employeeHTML = formatEmployeeInfo(employee);
       $('#results').append(employeeHTML);
      })
      $('#results-title').html($('#department-select option:selected').text())


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 

// List all of the employees in the selected location

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
      $('#results-title').html($('#location-select option:selected').text());


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 

// Reset and remove message classes from modals
$('#add-profile-btn').on('click', function () {

  $('#new-employee-fname').val('');
  $('#new-employee-lname').val('');
  $('#new-employee-job').val('');
  $('#new-employee-email').val('');

  $('#add-profile-message').removeClass('success');
  $('#add-profile-message').removeClass('error');

  $('#add-profile-message').html('');

})

$('#location-btn').on('click', function () {

  $('#new-location-name').val('');

  $('#edit-location-message').removeClass('success');
  $('#edit-location-message').removeClass('error');

  $('#edit-location-message').html('');

});

$('#department-btn').on('click', function () {

  $('#new-dpt-name').val('');

  $('#edit-department-message').removeClass('success');
  $('#edit-department-message').removeClass('error');

  $('#edit-department-message').html('');

});