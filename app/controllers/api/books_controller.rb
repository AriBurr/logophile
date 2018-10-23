class Api::BooksController < ApiController
  before_action :require_login, except: :all_books_with_ratings

  def create
    book = Book.check_if_duplicate(params[:book][:item])
    if !book.nil?
      render json: book
    else
      render json: ['Trouble Creating this book'], status: 422
    end
  end

  def all_books_with_ratings
    render json: Book.only_with_ratings
  end

  private

  def book_params
    params.require(:book).permit(:item)
  end
end
