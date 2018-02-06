class Api::BooksController < ApiController
  before_action :require_login
  before_action :set_bookshelf, only: [:index, :add_book_to_bookshelf]

  def index
    render json: @bookshelf.books
  end

  def create
    book = Book.check_if_duplicate(params[:book][:item])
    if !book.nil?
      binding.pry
      render json: book
    else
      render json: ['Trouble Creating this book'], status: 422
    end
  end

  def add_book_to_bookshelf
    shelving = @bookshelf.shelvings.create(book_id: params[:book_id])
    # search through pre-existing books, if it exists use that one
    binding.pry
    Book.change_count('inc', @bookshelf)
    if shelving.save
      render json: shelving
    else
      render json: { errors: shelving.errors.full_messages.join(', ')}, status: 422
    end
  end

  def destroy
    Book.change_count('dec', @bookshelf)
    Book.find(params[:id]).destroy
  end

  private
    def book_params
      params.require(:book).permit(:item)
    end

    def set_bookshelf
      @bookshelf = current_user.bookshelves.find(params[:id])
    end

    def set_book
      @book = params[:book]
    end

end
