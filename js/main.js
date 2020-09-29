$(document).ready(function() {
  //invoke the inputsData and the printData functions
  GetData();
  printData();
});

  //make a keypress function for the input
  $(".text_input").keypress(function(event) {
    if (event.which == 13) {
      printData();
      $(".text_input").val("");
    }
  });

  //make a click function for the button
  $(".insert_value").click(function(){
     printData();
     $(".text_input").val("");
  });

  //make a function printing the Data
  function printData(data) {
    //make variables for handlebars
    var source = $("#list_template").html();
    var template = Handlebars.compile(source)

    for (var i = 0; i < data.length; i++) {
      //prepare the context to insert it inside the handlebars Template
      var context = {
        "id": data[i].id,
        "text": data[i].text
    }
    //make a variable html with the context inside of it
    var html = template(context);
    // append inside the DOM
    $("#todo_list").append(html);
   }
  }
  //make a function asking for the inputsData
  function GetData () {
    //make an ajax call (read - GET)
    $.ajax(
   {
     "url":"http://157.230.17.132:3008/todos",
     "method":"GET",
     "success":function (data) {
       printData(data)
     },
     "error":function (error) {
       alert(error);
     }
   });
  }
  //  //make a function asking to deleteData
  //  function DeleteData(type) {
  //   //make an ajax call (delete - DELETE)
  //   $.ajax(
  //   {
  //    "url": "http://157.230.17.132:3008/todos",
  //    "method": "DELETE",
  //     }
  //  });
  // }
