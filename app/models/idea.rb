class Idea < ActiveRecord::Base
  validates_presence_of :title, :body
  enum quality: { "swill" => 0, "plausible" => 1, "genius" => 2 }

  def self.all_sorted
    ideas = Idea.all
    ideas.sort_by(&:created_at).reverse!
  end

  def update_quality(button_type)
    if button_type.include? "thumbs-up"
      self.increment(:quality, 1).save unless self.quality == "genius"
    else
      self.increment(:quality, -1).save unless self.quality == "swill"
    end
  end
end
