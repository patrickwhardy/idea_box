$(document).ready(function(){
  $("#create-idea").on("click", postIdea);
  $(".delete-idea").on("click", deleteIdea);
  $(".thumbs-up").on("click", updateQuality);
  $(".thumbs-down").on("click", updateQuality);
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
      $("#idea-" + ideaId).remove();
    }
  })
}

function updateQuality(){
  var ideaId = $(this).data("id");
  var button_type = $(this).attr("class");
  $.ajax({
    method: "PATCH",
    url: "/api/v1/ideas/" + ideaId,
    dataType: "JSON",
    data: {button_type: button_type},
    success: function(response) {
      $("#idea-" + ideaId)
      console.log("success");
    }
  })
}

function clearFields(){
  $("#Body").val("");
  $("#Title").val("");
}
