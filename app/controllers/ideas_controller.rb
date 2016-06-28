class IdeasController < ApplicationController
  def index
    @ideas = Idea.all_sorted
  end
end
