$(document).ready(function() {
  //invoke the inputsData function
  inputsData();
  printData();
});

  //make a function printing the Data
  function printData(data) {
    //make variables for handlebars
    var source = $("#list_template").html();
    var template = Handlebars.compile(source)
    var context = {
      "data": data
    };
    var html = template(context);
    $("#todo_list").append(html);
  }
  //make a function asking for the inputsData
  function inputsData () {
    //make an ajax call (read - GET)
    $.ajax(
   {
     "url":"http://157.230.17.132:3008/todos",
     "method":"GET",
     "success":function (data) {
       printData(data)
       console.log(data);
     },
     "error":function (error) {
       alert("E avvenuto un errore. "+ error);
     }
   });
  }
