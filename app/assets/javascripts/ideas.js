$(document).ready(function(){
  $("#create-idea").on("click", postIdea);
  $(".delete-idea").on("click", deleteIdea);
  $(".thumbs-up").on("click", updateQuality);
  $(".thumbs-down").on("click", updateQuality);
  $(".title").on("blur", submitEdits);
  $(".body").on("blur", submitEdits);
  $("#idea_filter").on("keyup", filterIdeas);
})

function postIdea(){
  var ideaData = {title: $("#Title").val(), body: $("#Body").val()};
  $.ajax({
    method: "POST",
    url: "/api/v1/ideas",
    dataType: "JSON",
    data: {idea: ideaData},
    success: function(response) {
      $(".ideas-index").prepend("<div class='well'>" + listIdea(response) + "</div>");
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
  var inputType = $(this).attr("class");
  $.ajax({
    method: "PATCH",
    url: "/api/v1/ideas/" + ideaId,
    dataType: "JSON",
    data: {inputType: inputType},
    success: function(response) {
      $("#idea-" + ideaId).html(listIdea(response));
    }
  })
}

function submitEdits() {
  var inputType = $(this).attr("class");
  var content = this.innerHTML;
  var ideaId = $(this).parent().attr("id");
  $.ajax({
    method: "PATCH",
    url: "/api/v1/ideas/" + ideaId,
    dataType: "JSON",
    data: {inputType: inputType, content: content},
    success: function(response) {
      $("#idea-" + ideaId).html(listIdea(response));
    }
  })
}

function filterIdeas(){
  console.log("YES!")
  var searchParams = $(this).val();
  $(".idea-content").each(function(index, idea){
    if(idea.innerHTML.search(searchParams) < 0){
      $(idea).parents(".well").hide();
    }
  })
}

function listIdea(response){
  return "<li>" + response.title + "<br> Idea: " + response.body +
  "<br> Quality: " + response.quality +
  "<br><button class='btn btn-default pull-right delete-idea' data-id='<%= idea.id %>'>Delete</button>" +
  "<button class='btn btn-default thumbs-up' data-id='<%= idea.id %>'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span></button>" +
  "<button class='btn btn-default thumbs-down' data-id='<%= idea.id %>'><span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span></button></li>"
}
function clearFields(){
  $("#Body").val("");
  $("#Title").val("");
}
