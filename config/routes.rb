Rails.application.routes.draw do
  namespace :api do
    resources :students, only: :index
    resources :courses, only: :index
    resources :grades, only: :index
    post '/students/mass_upload', to: 'students#mass_upload'
    post '/courses/mass_upload', to: 'courses#mass_upload'
    post '/grades/mass_upload', to: 'grades#mass_upload'
  end

  get '*other', to: 'static#index'
end
