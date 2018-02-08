class Api::ShelvingsController < ApiController
  before_action :require_login
  before_action :set_bookshelf, only: [:index, :create, :destroy]

  def index
    render json: Shelving.with_book(@bookshelf.id)
  end

  def create
    shelving = @bookshelf.shelvings.new(shelving_params)
    binding.pry
    Bookshelf.change_count('inc', @bookshelf)
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
      params.require(:shelving).permit(:name, :book_id)
    end

    def set_bookshelf
      @bookshelf = current_user.bookshelves.find(params[:shelf_id])
    end

end
