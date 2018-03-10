Rails.application.routes.draw do
  get 'users/new'

  namespace :api do

    scope :format => true, :constraints => { :format => 'json' } do
      post   "/login"       => "sessions#create"
      delete "/logout"      => "sessions#destroy"
    end

    resources :users, only: :create
    resources :bookshelves, except: [:new, :edit, :show]
    resources :books, only: [:create]
    resources :announcements, only: [:index, :update]
    resources :ratings, only: [:create, :update]
    resources :shelvings, only: [:create, :destroy, :index, :update]

    resources :clubs, only: [:create, :destroy, :index, :update, :show]
    get '/find_user_clubs', to: 'clubs#find_user_clubs'

    resources :memberships
    resources :readings
    resources :discussions

    get '/users/find', to: 'users#logged_in_user'
    get '/books/with_ratings', to: 'books#all_books_with_ratings'
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
