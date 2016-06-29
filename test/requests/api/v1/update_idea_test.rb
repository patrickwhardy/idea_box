require "test_helper"
require "rack/test"

class UpdateIdeaTest < ActiveSupport::TestCase
  include Rack::Test::Methods

  def app
    IdeaBox::Application
  end

  test "it updates body" do
    idea = create(:idea)
    parameters = {"inputType"=>"body", "content"=>"wowzoa", "id"=> idea.id.to_s}
    response = patch "/api/v1/ideas/#{idea.id}", parameters

    assert_equal(200, response.status)
    idea = Idea.find(idea.id)
    assert_equal("wowzoa", idea.body)
  end

  test "it updates title" do
    idea = create(:idea)
    parameters = {"inputType"=>"title", "content"=>"wowzoa", "id"=> idea.id.to_s}
    response = patch "/api/v1/ideas/#{idea.id}", parameters

    assert_equal(200, response.status)
    idea = Idea.find(idea.id)
    assert_equal("wowzoa", idea.title)
  end
end
