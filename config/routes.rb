Rails.application.routes.draw do
  namespace :api do
    resources :students, only: [:create, :index]
    resources :courses, only: [:create, :index]
    resources :grades, only: [:create, :index]
  end

  get '*other', to: 'static#index'
end
