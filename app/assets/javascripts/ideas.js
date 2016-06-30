$(document).ready(function(){
  $(document).on("click", "#create-idea", postIdea)
  $(document).on("click", ".delete-idea", deleteIdea);
  $(document).on("click", ".thumbs-up", updateQuality);
  $(document).on("click", ".thumbs-down", updateQuality);
  $(document).on("blur", ".title", submitEdits);
  $(document).on("blur", ".body", submitEdits);
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
  var searchParams = $(this).val();
  $(".idea-content").each(function(index, idea){
    if(idea.innerHTML.search(searchParams) < 0){
      $(idea).parents(".well").hide();
    } else {
      $(idea).parents(".well").show();
    }
  })
}

function listIdea(response){
  return "<li><div class='idea-content' id='" + response.id +
  "'><p contenteditable='true' class='title'>" + response.title +
  "</p><br>Idea: <p contenteditable='true' class='body'>" + response.body +
  "</p></div><br>Quality: " + response.quality +
  "<br><button class='btn btn-default pull-right delete-idea' data-id='" + response.id + "'>Delete</button>" +
  "<button class='btn btn-default thumbs-up' style='margin-right:4px;' data-id='" + response.id +
  "'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span></button><button class='btn btn-default thumbs-down' data-id='" + response.id +
  "'><span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span></button></li>"
}

function clearFields(){
  $("#Body").val("");
  $("#Title").val("");
}
