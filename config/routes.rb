Rails.application.routes.draw do
  get 'users/new'

  namespace :api do
    resources :users, only: [:new, :create]
    resources :sessions, only: [:create, :destroy]
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
