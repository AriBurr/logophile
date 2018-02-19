require 'rails_helper'

RSpec.describe Api::BookshelvesController, type: :request do
  login_user

  describe 'unauthorized request' do

    it 'returns unauthenticated' do
      get "/api/bookshelves"
      expect(response).to have_http_status(:unauthorized)
    end

  end

  describe 'GET #index' do
    before(:each) do
      @res = get "/api/bookshelves", headers: @headers
    end

    it 'successfully renders json' do
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq("application/json")
    end

    it 'should respond with users bookshelves ordered asc' do
      binding.pry
    end

  end

  describe 'POST #create' do

    it 'creates new bookshelf' do
    end

    it 'renders json when saved' do
    end

    it 'renders error when not saved' do
    end

  end

  describe 'PUT #update' do

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
