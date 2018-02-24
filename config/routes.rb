Rails.application.routes.draw do
  namespace :api do
    resources :students, only: [:create, :index]
    resources :courses, only: [:create, :index]
    resources :grades, only: [:create, :index]
    post '/students/mass_upload', to: 'students#mass_upload'
    post '/courses/mass_upload', to: 'courses#mass_upload'
    post '/grades/mass_upload', to: 'grades#mass_upload'
  end

  get '*other', to: 'static#index'
end
