require_relative '../test_helper'

class DisplayIdeasTest < ActionDispatch::IntegrationTest
  def setup
    @idea = create(:idea)
    # assert_equal Idea.count, 1
  end

  def test_it_renders_the_root
    visit '/'
    assert_equal 200, page.status_code

    within("h1") do
      assert page.has_content?("Ideas"), "page has heading"
    end

    within("ul") do
      assert page.has_content?(@idea.title)
      assert page.has_content?(@idea.body)
      assert page.has_content?(@idea.quality)
    end
  end
end
