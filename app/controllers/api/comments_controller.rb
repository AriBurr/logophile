class Api::CommentsController < ApplicationController
  before_action :require_login
  before_action :set_comment, only: [:update, :destroy]

  def index
    render json: current_user.comments.all.order(created_at: :asc)
  end

  def create
    comment = current_user.comments.new(comment_params)
    if comment.save
      render json: comment
    else
      render json: { errors: comment.errors.messages.values }, status: 422
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: { errors: @comment.errors.messages.values }, status: 422
    end
  end

  def destroy
    @comment.destroy
  end

  private
    def comment_params
      params.require(:comment).permit(:content, :discussion_id)
    end

    def set_comment
      @comment = current_user.comments.find(params[:id])
    end
end
