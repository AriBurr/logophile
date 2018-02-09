class Api::ShelvingsController < ApiController
  before_action :require_login
  before_action :set_bookshelf, only: [:index, :create, :update, :destroy]

  def index
    render json: Shelving.with_book(@bookshelf.id)
  end

  def create
    shelving = @bookshelf.shelvings.new(shelving_params)
    Bookshelf.change_count('inc', @bookshelf)
    if shelving.save
      render json: shelving
    else
      render json: { errors: shelving.errors.full_messages.join(', ')}, status: 422
    end
  end

  def create_return
    current_user.bookshelves
    response = {
      shelves: current_user.bookshelves,
      shelvings: Shelving.with_book(@bookshelf.id)
    }
  end

  def update
    shelving = Shelving.find(params[:id])
    Bookshelf.handle_count(params[:shelf_id],params[:from_shelf].to_i)
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
    if shelving.destroy
      render json: Bookshelf.change_count('dec', @bookshelf)
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
