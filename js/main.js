// script
$(document).ready(function() {
  $(".submit_text").val("");
  getData();
  //make a click function to addContent
  $(".submit_button").click(function() {
    var inputValue = $(".submit_text").val();
    addContent(inputValue);
  });
  //make a keypress function to addContent
  $(".submit_text").keypress(function(event) {
   if (event.which == 13) {
     var inputValue = $(".submit_text").val();
     addContent(inputValue);
   }

 });
  //make a click function to delte the content
  $("#todo_list").on("click", ".delete", function() {
    deleteContent($(this).parent());
  });

});

// FUNCTIONS
//make a deleteContent to ask the Api to delete the items inside the DOM
function deleteContent(elm) {
  var id = elm.attr("id");
  $.ajax(
    {
      "url": "http://157.230.17.132:3008/todos/" + id,
      "method": "DELETE",
      "success": function(date, state) {
        elm.remove();
      },
      "error": function() {
        alert("error");
      },
    }
  );
}
//make an addContent function to ask the Api to add the items inside the DOM
function addContent(string) {
  if (string != "") {
    $.ajax(
      {
        "url": "http://157.230.17.132:3008/todos",
        "data": {
          "text": string
        },
        "method": "POST",
        "success": function(date, state) {
          displayData(date);
          $(".submit_text").val("");
        },
        "error": function() {
          alert("error");
        },
      }
    );
  }
}
//make a displayData function preparing the handlebars, and append the items inside the DOM
function displayData(date) {
  //preparing the handlebars template
  var source = $("#list_template").html();
  var template = Handlebars.compile(source);
  if (date.length != undefined) {
    //make a for cicle to search all the results inside the Api array
    for (var i = 0; i < date.length; i++) {
      var html = template(date[i]);
      //append the data inside the DOM
      $("#todo_list").append(html);
    }
  }
}
//make a getData function asking the items from the API to inserting it inside the DOM
function getData() {
  $.ajax(
    {
      "url": "http://157.230.17.132:3008/todos",
      "method": "GET",
      "success": function(date, state) {
        displayData(date);
      },
      "error": function() {
        alert("error");
      },
    }
  );
}
