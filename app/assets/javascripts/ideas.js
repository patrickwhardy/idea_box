$(document).ready(function(){
  $("#create-idea").on("click", postIdea);
})

function postIdea(){
  var ideaData = {title: $("#Title").val(), body: $("#Body").val()};
  $.ajax({
    method: "POST",
    url: "/api/v1/ideas",
    dataType: "JSON",
    data: {idea: ideaData},
    success: function(response) {
      $(".ideas-index").prepend("<div class='well'><li>" +
        response.title + "<br> Idea: " + response.body +
        "<br> Quality: " + response.quality + "</li></div>");
        clearFields();
    }
  })
}

function clearFields(){
  $("#Body").val("");
  $("#Title").val("");
}
