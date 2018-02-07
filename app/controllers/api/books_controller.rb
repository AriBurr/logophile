class Api::BooksController < ApiController
  before_action :require_login
  before_action :set_bookshelf, only: [:index, :add_book_to_bookshelf, :destroy]

  def index
    render json: @bookshelf.books
  end

  def create
    book = Book.check_if_duplicate(params[:book][:item])
    if !book.nil?
      render json: book
    else
      render json: ['Trouble Creating this book'], status: 422
    end
  end

  def add_book_to_bookshelf
    shelving = @bookshelf.shelvings.create(book_id: params[:book_id])
    Book.change_count('inc', @bookshelf)
    if shelving.save
      render json: shelving
    else
      render json: { errors: shelving.errors.full_messages.join(', ')}, status: 422
    end
  end

  def destroy
    Book.change_count('dec', @bookshelf)
    @bookshelf.destroy
  end

  private
    def book_params
      params.require(:book).permit(:item)
    end

    def set_bookshelf
      @bookshelf = current_user.bookshelves.find(params[:shelf_id])
    end

    def set_book
      @book = params[:book]
    end

end
