Rails.application.routes.draw do
  get 'users/new'

  namespace :api do
    resources :users
    resources :sessions
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
