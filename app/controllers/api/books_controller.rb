class Api::BooksController < ApplicationController
  before_action :require_login
  before_action :set_bookshelf, only: :add_book_to_bookshelf

  def index
    @bookshelf.books
  end

  def create
    # a user can create a book in not already existing in google API
  end

  # book will come in as json
  def add_book_to_bookshelf
    shelving = @bookshelf.shelvings.create(book_id: params[:id])
    if shelving.save
      render json: Book.find(params[:id])
    else
      render json: { errors: book.full_messages }, status: 422
    end
  end

  def destroy
    Shelving.find_by_bookshelf_id(params[:shelf_id]).destroy
  end

  private
    def book_params
      params.require(:book).permit(:item)
    end

    def set_bookshelf
      @bookshelf = current_user.bookshelf.find(params[:shelf_id])
    end

    def set_book
      @book = params[:book]
    end

end
