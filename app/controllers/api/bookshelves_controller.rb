class Api::BookshelvesController < ApiController
  before_action :require_login
  before_action :set_bookshelf, only: [:update, :destroy]

  def index
    render json: current_user.bookshelves.all.order(created_at: :asc)
  end

  def create
    shelf = current_user.bookshelves.new(bookshelf_params)
    if shelf.save
      render json: shelf
    else
      render json: { errors: shelf.errors.messages.values }, status: 422
    end
  end

  def update
    if @shelf.update(bookshelf_params)
      render json: @shelf
    else
      render json: { errors: @shelf.errors.messages.values }, status: 422
    end
  end

  def destroy
    @shelf.destroy
  end

  private
    def bookshelf_params
      params.require(:bookshelf).permit(:name, :count)
    end

    def set_bookshelf
      @shelf = current_user.bookshelves.find(params[:id])
    end

end
