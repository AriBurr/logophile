Rails.application.routes.draw do
  get 'users/new'

  namespace :api do
<<<<<<< HEAD
    resources :users
    resources :sessions
=======
    resources :users, only: [:new, :create]
    resource :session, only: [:create, :destroy]
>>>>>>> adv-login
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
