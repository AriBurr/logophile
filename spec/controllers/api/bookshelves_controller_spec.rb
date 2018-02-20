require 'rails_helper'

RSpec.describe Api::BookshelvesController, type: :request do
  login_user

  let(:valid_attributes) {
    { name: 'test_1', user_id: 3 }
  }

  let(:invalid_attributes) {
    { name: '', user_id: nil }
  }

  describe 'unauthorized request' do

    it 'returns unauthenticated' do
      get "/api/bookshelves"
      expect(response).to have_http_status(:unauthorized)
    end

  end

  describe 'GET #index' do

    it 'successfully renders json' do
      get "/api/bookshelves", headers: @headers
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq("application/json")
    end

    it 'should respond with users bookshelves ordered asc' do
      shelf = @user.bookshelves.create(valid_attributes)
      expect(@user.bookshelves.order('created_at asc').last).to eq(shelf)
    end

  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates new bookshelf' do
        expect {
          post "/api/bookshelves",
          params: {bookshelf: valid_attributes},
          headers: @headers
        }.to change(Bookshelf, :count).by(1)
      end

      it 'renders json when saved' do
        post "/api/bookshelves",
        params: {bookshelf: valid_attributes},
        headers: @headers
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid params' do
      it 'does not create new bookshelf' do
        expect {
          post "/api/bookshelves",
          params: {bookshelf: invalid_attributes},
          headers: @headers
        }.to change(Bookshelf, :count).by(0)
      end

      it 'renders error when not saved' do
        post "/api/bookshelves",
        params: {bookshelf: invalid_attributes},
        headers: @headers
        expect(response).to have_http_status(422)
      end
    end



  end

  describe 'PUT #update' do

    context 'with valid params' do
      let(:new_attributes) {
        { name: 'new_name' }
      }
    end

    it 'updates the selected bookshelf' do
    end

    it 'renders json if update is successdul' do

    end

    it 'renders error when not updated' do

    end

  end

  describe 'DELETE #destroy' do

    it 'deletes bookshelf record from the databse' do
    end

  end

end
