require_relative '../test_helper'

class AddIdeaTest < ActionDispatch::IntegrationTest
  def setup
    Capybara.current_driver = :selenium
  end

  def test_it_adds_an_idea
    visit "/"
    fill_in "Title", with: "A Title"
    fill_in "Body", with: "A Body"
    click_on("Save")

    wait_for_ajax

    within ".ideas-index" do
      assert page.has_content?("A Title")
      assert page.has_content?("A Body")
    end
  end

  def teardown
    Capybara.use_default_driver
  end
end
