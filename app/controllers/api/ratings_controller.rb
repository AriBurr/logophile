class Api::RatingsController < ApiController
  before_action :require_login
  before_action :set_book, only: %i[create update]

  def create
    review = current_user.ratings.new(rating_params)
    if review.save
      render json: review
    else
      render json: { errors: shelving.errors.full_messages.join(', ')}, status: 422
    end
  end

  def update; end

  private

  def rating_params
    params.require(:rating).permit(:value, :book_id, :user_id)
  end

  def set_book
    @book = Book.find(params[:book_id])
  end
end
