class Idea < ActiveRecord::Base
  validates_presence_of :title, :body
  enum quality: { "swill" => 0, "plausible" => 1, "genius" => 2 }

  def self.all_sorted
    ideas = Idea.all
    ideas.sort_by(&:created_at).reverse!
  end
end
