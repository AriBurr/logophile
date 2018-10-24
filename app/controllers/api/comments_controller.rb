class Api::CommentsController < ApiController
  before_action :require_login
  before_action :set_comment, only: %i[update destroy]
  before_action :set_discussion, only: [:index]

  def index
    render json: @discussion.comments
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
    @comment = Comment.find(params[:id])
  end

  def set_discussion
    @discussion = Discussion.find(params[:discussion_id])
  end
end
