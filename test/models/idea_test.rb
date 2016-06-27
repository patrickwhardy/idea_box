require 'test_helper'

class IdeaTest < ActiveSupport::TestCase
  test "it requires title and body" do
    no_title = Idea.new(body: "body")
    no_body = Idea.new(title: "title")

    refute(no_title.save)
    refute(no_body.save)
  end

  test "it sorts descending" do
    idea1 = create(:idea)
    idea2 = create(:idea)

    assert_equal(Idea.all_sorted.first, idea2)
  end

end
