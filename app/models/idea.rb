class Idea < ActiveRecord::Base
  validates_presence_of :title, :body
  enum quality: { "swill" => 0, "plausible" => 1, "genius" => 2 }

  def self.all_sorted
    ideas = Idea.all
    ideas.sort_by(&:created_at).reverse!
  end

  def delegate_edit(params)
    if params["inputType"].include? "thumbs-up" || "thumbs-down"
      self.updateQuality(params["inputType"])
    else
      self.updateContent(params)
    end
  end

  def updateContent(params)
    if params["inputType"].include? "title"
      self.title = params["content"]
      self.save
    elsif params["inputType"].include? "body"
      self.body = params["content"]
      self.save
    end
  end

  def update_quality(button_type)
    if button_type.include? "thumbs-up"
      self.increment(:quality, 1).save unless self.quality == "genius"
    else
      self.increment(:quality, -1).save unless self.quality == "swill"
    end
  end
end
