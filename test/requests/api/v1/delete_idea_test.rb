require "test_helper"
require "rack/test"

class PostIdeaTest < ActiveSupport::TestCase
  include Rack::Test::Methods

  def app
    IdeaBox::Application
  end

  test "it deletes the idea" do
    idea = create(:idea)
    parameters = {"id" => idea.id.to_s}

    response = delete "/api/v1/ideas/#{idea.id}"

    assert_equal(204, response.status)

    assert_not_equal(Idea.last.id, idea.id)
  end
end
