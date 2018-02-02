Rails.application.routes.draw do
  get 'users/new'


  namespace :api do
    scope :format => true, :constraints => { :format => 'json' } do
      post   "/login"       => "sessions#create"
      delete "/logout"      => "sessions#destroy"
    end
    resources :users, only: [:new, :create]
    # resource :session, only: [:create, :destroy]
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
