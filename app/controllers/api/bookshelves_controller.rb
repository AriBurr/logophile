class Api::BookshelvesController < ApplicationController
  before_action :require_login
  before_action :set_bookshelf, only [:update, :destroy]

  def index
    render json: current_user.bookshelves.all.order(created_at: :desc)
  end

  def create
    shelf = current_user.booksheves.new(bookshelf_params)
    if shelf.save
      render json: shelf
    else
      render json: { errors: shelf.full_messages }, status: 422
    end
  end

  def update
    if @shelf.update(params[:bookshelf])
      render json: @shelf
    else
      render json: { errors: @shelf.full_messages }, status: 422
    end
  end

  def destroy
    @shelf.destroy
  end

  private
    def bookshelf_params
      params.require(:bookshef).permit(:name)
    end

    def set_bookshelf
      @shelf = current_user.bookshelves.find(params[:id])
    end

end
