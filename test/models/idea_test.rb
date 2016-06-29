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

  test "it delegates and upvotes" do
    idea = create(:idea)
    assert_equal(idea.quality, "swill")
    params = {"inputType" => "thumbs-up"}

    idea.delegate_edit(params)
    assert_equal(idea.quality, "plausible")
  end

  test "it delegates and downvotes" do
    idea = create(:idea)
    idea.quality = "plausible"
    params = {"inputType" => "thumbs-down"}

    idea.delegate_edit(params)
    assert_equal(idea.quality, "swill")
  end

  test "it doesn't downvote swill" do
    idea = create(:idea)
    assert_equal(idea.quality, "swill")
    params = {"inputType" => "thumbs-down"}

    idea.delegate_edit(params)
    assert_equal(idea.quality, "swill")
  end

  test "it doesn't upvote genius" do
    idea = create(:idea)
    idea.quality = "genius"
    params = {"inputType" => "thumbs-up"}

    idea.delegate_edit(params)
    assert_equal(idea.quality, "genius")
  end

  test "it updates title" do
    idea = create(:idea)
    params = {"inputType" => "title", "content" => "WOW!"}

    idea.updateContent(params)

    assert_equal(idea.title, "WOW!")
  end

  test "it updates body" do
    idea = create(:idea)
    params = {"inputType" => "body", "content" => "WOW!"}

    idea.updateContent(params)

    assert_equal(idea.body, "WOW!")
  end
end
