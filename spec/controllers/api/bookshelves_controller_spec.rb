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
        expect(response.content_type).to eq("application/json")
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
        expect(response.content_type).to eq("application/json")
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) {
        { name: 'new_name' }
      }

      it 'updates the selected bookshelf' do
        shelf = @user.bookshelves.create! valid_attributes
        put "/api/bookshelves/#{shelf.id}",
        params: {bookshelf: new_attributes},
        headers: @headers
        shelf.reload
        expect(@user.bookshelves.last.name).to eq(shelf.name)
      end

      it 'renders json if update is successful' do
        shelf = @user.bookshelves.create! valid_attributes
        put "/api/bookshelves/#{shelf.id}",
        params: {bookshelf: new_attributes},
        headers: @headers
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json")

      end
    end

    context 'with invalid params' do
      it 'does not update bookshelf' do
        shelf = @user.bookshelves.create! valid_attributes
        put "/api/bookshelves/#{shelf.id}",
        params: {bookshelf: invalid_attributes},
        headers: @headers
        shelf.reload
        expect(@user.bookshelves.last.name).to_not eq(invalid_attributes[:name])
      end

      it 'renders error when not updated' do
        shelf = @user.bookshelves.create! valid_attributes
        put "/api/bookshelves/#{shelf.id}",
        params: {bookshelf: invalid_attributes},
        headers: @headers
        expect(response).to have_http_status(422)
        expect(response.content_type).to eq("application/json")
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes bookshelf record from the databse' do
      shelf = @user.bookshelves.create! valid_attributes
      expect {
        delete "/api/bookshelves/#{shelf.id}",
        params: {bookshelf: invalid_attributes},
        headers: @headers
      }.to change(Bookshelf, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
