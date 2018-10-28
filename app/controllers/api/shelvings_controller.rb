class Api::ShelvingsController < ApiController
  before_action :require_login
  before_action :set_bookshelf, only: %i[index create update destroy]

  def index
    render json: Shelving.with_book(@bookshelf.id)
  end

  def create
    shelving = @bookshelf.shelvings.new(shelving_params)
    Bookshelves::BookshelfBank.new('inc', @bookshelf).change_count
    if shelving.save
      render json: shelving
    else
      render json: { errors: shelving.errors.full_messages.join(', ')}, status: 422
    end
  end

  def update
    shelving = Shelving.find(params[:id])
    Bookshelves::BookshelfBank.new(params[:shelf_id], params[:from_shelf]).call
    if shelving.update(shelving_params)
      render json: {
        shelves: current_user.bookshelves.order(created_at: :asc),
        shelvings: Shelving.with_book(@bookshelf.id)
      }
    else
      render json: { errors: shelving.full_messages }, status: 422
    end
  end

  def destroy
    shelving = Shelving.find(params[:id].to_i)
    bookshelf = Bookshelves::BookshelfBank.new('dec', @bookshelf).change_count
    if shelving.destroy
      render json: bookshelf
    else
      render json: { errors: shelf.errors.full_messages.join(', ')}, status: 422
    end
  end

  private

  def shelving_params
    params.require(:shelving).permit(:name, :book_id, :bookshelf_id)
  end

  def set_bookshelf
    @bookshelf = current_user.bookshelves.find(params[:shelf_id])
  end
end
