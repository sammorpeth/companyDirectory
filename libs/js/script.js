
const formatEditProfileModal = (employee) => {
  const editProfileHTML = ` <label for="current-employee-fname">First Name</label>
                            <input class="form-control" id="current-employee-fname" type="text" name="current-employee-fname" value="${employee.firstName}" required>
                            <label for="current-employee-lname">Last Name</label>
                            <input class="form-control" id="current-employee-lname" type="text" name="current-employee-lname" value="${employee.lastName}" required>
                            <label for="current-employee-job">Job Title</label>
                            <input class="form-control" id="current-employee-job" type="text" name="current-employee-job" value="${employee.jobTitle}" required>
                            <label for="current-employee-email">Email</label>
                            <input class="form-control" id="current-employee-email" type="email" name="current-employee-email" value="${employee.email}" required>
                            <label for="current-employee-location">Department</label>
                            <select class="custom-select" id="current-employee-department-select">
                            
                            </select>`

  appendDepartmentsToSelects('#current-employee-department-select');

  $(`#current-employee-department-select option[value=${employee.departmentID}]`).attr("selected",true);
  

  $('#editProfileBody').append(editProfileHTML);
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

const formatEmployeeInfo = (employee) => {
    // const employeeHTML = `<div class="col-12 col-lg-6 shadow-sm p-3 mb-3 rounded employee-card">
    //                         <h5 >${employee.firstName} ${employee.lastName}</h5>
    //                         <p id="employee-id" hidden>${employee.id}</p>

    //                         <ul>
    //                           <li>Email: ${employee.email}</li>
    //                           <li>Job Title: ${employee.jobTitle}</li>
    //                           <li>Department: ${employee.department}</li>
    //                           <li>Location: ${employee.location}</li>
    //                           <button type="button" class="btn btn-primary edit-btn"  data-toggle="modal" data-target="#editProfileModal">Edit</button>
    //                         </ul>
    //                       </div>
    //                       `

  let employeeHTML = $(`<div class="col-12 col-lg-6 shadow-sm p-3 mb-3 rounded employee-card">
                      <h5 >${employee.firstName} ${employee.lastName}</h5>
                      <p id="employee-id" hidden>${employee.id}</p>

                      <ul>
                        <li>Email: ${employee.email}</li>
                        <li>Job Title: ${employee.jobTitle}</li>
                        <li>Department: ${employee.department}</li>
                        <li>Location: ${employee.location}</li>
                        
                      </ul>
                    </div>
                    `);

  let editBtn = $(`<button type="button" class="btn btn-primary edit-btn"  data-toggle="modal" data-target="#editProfileModal">Edit</button>`);
  employeeHTML.append(editBtn);

  editBtn.on('click', () => {
    getInfoById(employee.id);
  })
    
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



// Initiates the page with select options etc. 
$(document).ready(function() {
  
  appendDepartmentsToSelects('#department-select');
  appendDepartmentsToSelects('#new-employee-department-select');
  appendLocationsToSelects('#location-select');
  appendLocationsToSelects('#new-dpt-location-select');

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

$('#insert-dpt-btn').on('click',function() {

  $.ajax({
    url: "libs/php/insertDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      name: $('#new-dpt-name').val(),
      locationID: $('#new-dpt-location-select').val(),

    },
    
    success: function(result) {
      console.log('hi');


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 

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


    },
    error: function(jqXHR, textStatus, errorThrown) {

      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);
    }
  });
}); 

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
      console.log('hi');


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
