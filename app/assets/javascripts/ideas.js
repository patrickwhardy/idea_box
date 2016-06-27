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
    success: $('.ajax-flash').html("<div class='alert alert-success'><h4>Successfully Created a New Idea!</h4></div>")
  })
}
