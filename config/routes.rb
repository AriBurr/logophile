Rails.application.routes.draw do
  get 'users/new'


  namespace :api do
    scope :format => true, :constraints => { :format => 'json' } do
      post   "/login"       => "sessions#create"
      delete "/logout"      => "sessions#destroy"
    end
    resources :users, only: :create
    resources :bookshelves, except: [:new, :edit, :show]
    resources :books, only: [:index, :destroy]
    post '/shelf/:shelf_id/book/:id', to: 'books#add_book_to_bookshelf'
    # resource :session, only: [:create, :destroy]
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
