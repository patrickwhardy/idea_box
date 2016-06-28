$(document).ready(function(){
  $("#create-idea").on("click", postIdea);
  $(".delete-idea").on("click", deleteIdea);
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

function deleteIdea(){
  var ideaId = $(this).data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/v1/ideas/" + ideaId,
    dataType: "JSON",
    success: function(response) {
      console.log("success");
      $("#idea-" + ideaId).remove();
    }
  })
}

function clearFields(){
  $("#Body").val("");
  $("#Title").val("");
}
