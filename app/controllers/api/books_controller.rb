class Api::BooksController < ApiController
  before_action :require_login
  before_action :set_bookshelf, only: [:index, :add_book_to_bookshelf]

  def index
    render json: @bookshelf.books
  end

  def create
    book = Book.create(item: params[:book][:item])
    if book.save
      render json: book
    else
      render json: { errors: book.errors.full_messages.join(',') }, status: 422
    end
  end

  def add_book_to_bookshelf
    shelving = @bookshelf.shelvings.create(book_id: params[:book_id])
    if shelving.save
      render json: shelving
    else
      render json: { errors: shelving.errors.full_messages.join(', ')}, status: 422
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
      @bookshelf = current_user.bookshelves.find(params[:id])
    end

    def set_book
      @book = params[:book]
    end

end
