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
       post :create, params: { book: { item: { kind: 'books#volume', id: '12345'} } }
       expect(Book.count).to eq(1)
    end
  end

end
