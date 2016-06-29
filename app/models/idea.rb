class Idea < ActiveRecord::Base
  validates_presence_of :title, :body
  enum quality: { "swill" => 0, "plausible" => 1, "genius" => 2 }

  def self.all_sorted
    ideas = Idea.all
    ideas.sort_by(&:created_at).reverse!
  end

  def delegate_edit(params)
    if params["inputType"].include? "thumbs-up"
      self.upvote
    elsif params["inputType"].include? "thumbs-down"
      self.downvote
    else
      self.updateContent(params)
    end
  end

  def updateContent(params)
    if params["inputType"].include? "title"
      self.update(title: params["content"])
    elsif params["inputType"].include? "body"
      self.update(body: params["content"])
    end
  end

  def upvote
    self.increment(:quality, 1).save unless self.quality == "genius"
  end

  def downvote
    self.increment(:quality, -1).save unless self.quality == "swill"
  end
end
