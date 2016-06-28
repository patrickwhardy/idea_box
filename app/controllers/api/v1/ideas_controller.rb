class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def create
    @idea = Idea.create(idea_params)
    respond_with :api, :v1, @idea
  end

  def destroy
    respond_with status: 204 if Idea.delete(params["id"])
  end

  private

  def idea_params
    params.require(:idea).permit(:body, :title, :quality)
  end
end
