require 'rails_helper'

RSpec.describe Api::BooksController, type: :request do
  login_user

  describe 'POST #create' do

    it 'renders json for new book' do
      data = { book: { item: { kind: "booksVolume", id: "12345"} } }
      post "/api/books", :params => data, :headers => @headers
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq("application/json")
      expect(Book.count).to eq(1)
    end

  end

  describe 'GET #all_books_with_ratings' do
    it 'renders successful json' do
      get "/api/books/with_ratings"
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq("application/json")
    end
  end

end
