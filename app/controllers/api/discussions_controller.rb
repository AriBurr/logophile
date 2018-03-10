class Api::BookshelvesController < ApiController
  before_action :require_login
  before_action :set_discussion, only: [:update, :destroy]

  def index
    render json: current_user.discussions.all.order(created_at: :asc)
  end

  def create
    discussion = current_user.discussions.new(discussion_params)
    if discussion.save
      render json: discussion
    else
      render json: { errors: discussion.errors.messages.values }, status: 422
    end
  end

  def update
    if @discussion.update(discussion_params)
      render json: @discussion
    else
      render json: { errors: @discussion.errors.messages.values }, status: 422
    end
  end

  def destroy
    @discussion.destroy
  end

  private
    def discussion_params
      params.require(:discussion).permit(:title, :content)
    end

    def set_discussion
      @discussion = current_user.discussions.find(params[:id])
    end

end
