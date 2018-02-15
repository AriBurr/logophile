require 'rails_helper'

RSpec.describe Api::BooksController, type: :controller do
  login_user

  let(:valid_attributes) {
    { item: { kind: 'books#volume', id: '12345'} }
  }

  let(:invalid_attributes) {
    { item: {} }
  }

  describe 'POST #create' do
    it 'creates a new book' do
       # FactoryBot.create(:book)
       binding.pry
       # post :create, params: { book: { item: { kind: "booksVolume", id: "12345"} } }
       post "/api/books", :params => { book: { item: { kind: "booksVolume", id: "12345"} } }, :headers => headers
       expect(Book.count).to eq(1)
    end
  end

  describe 'GET #all_books_with_ratings' do
    it 'returns books only with ratings' do

    end
  end

end
