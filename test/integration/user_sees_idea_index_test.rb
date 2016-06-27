require_relative '../test_helper'

class DisplayIdeasTest < ActionDispatch::IntegrationTest
  def setup
    Capybara.app = IdeaBox::Application
    @idea = create(:idea)
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
      save_and_open_page
    end
  end
end
