class Api::UsersController < ApiController

  def new
    @user = User.new
  end

  def logged_in_user
    render json: current_user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  private
    def user_params
      params.require(:user).permit(:password, :password_confirmation, :name, :email)
    end

end
