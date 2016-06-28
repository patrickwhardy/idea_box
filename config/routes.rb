Rails.application.routes.draw do
  root to: 'ideas#index'

  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:create, :show], defaults: {format: 'json'} do
      end
    end
  end
end
