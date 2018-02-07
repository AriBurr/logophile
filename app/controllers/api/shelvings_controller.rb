class Api::ShelvingsController < ApiController
  before_action :require_login
  before_action :set_bookshelf, only: [:index, :add_book_to_bookshelf, :destroy]

  def index
    render json: @bookshelf.shelvings
  end

  def add_book_to_bookshelf
    shelving = @bookshelf.shelvings.create(book_id: params[:book_id])
    Bookshelf.change_count('inc', @bookshelf)
    binding.pry
    if shelving.save
      render json: shelving
    else
      render json: { errors: shelving.errors.full_messages.join(', ')}, status: 422
    end
  end

  def destroy
    shelf = Shelving.find(params[:id].to_i)
    if shelf.destroy
      Bookshelf.change_count('dec', @bookshelf)
    else
      render json: { errors: shelf.errors.full_messages.join(', ')}, status: 422
    end
  end

  private

    def shelving_params
      params.require(:book).permit(:name, :count)
    end

    def set_bookshelf
      @bookshelf = current_user.bookshelves.find(params[:shelf_id])
    end

end
