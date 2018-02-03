class Api::BooksController < ApplicationController
  before_action :require_login

  def index
    @bookshelf.books
  end

  def create
  end

  def destroy
  end

  private
    def book_params
      params.require(:book).permit(:item)
    end

    def set_bookshelf
      @bookshelf = current_user.bookshelf.find(params[:bookshelf])
    end

    def set_book
      @book = params[:book]
    end

end
