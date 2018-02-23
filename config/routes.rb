Rails.application.routes.draw do
  namespace :api do
    resources :students, only: [:create, :index]
  end

  get '*other', to: 'static#index'
end
