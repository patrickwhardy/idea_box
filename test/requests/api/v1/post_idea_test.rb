require "test_helper"
require "rack/test"

class PostIdeaTest < ActiveSupport::TestCase
  include Rack::Test::Methods

  def app
    IdeaBox::Application
  end

  test "it posts a new idea" do
    parameters = {"idea"=>{"title"=>"title", "body"=>"body"}}
    response = post "/api/v1/ideas.json", parameters

    assert_equal(201, response.status)

    idea = Idea.last

    assert_equal("title", idea.title)
    assert_equal("body", idea.body)
  end
end
