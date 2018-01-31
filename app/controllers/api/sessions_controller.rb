class Api::SessionsController < ApplicationController
  def create
    email = params[:session][:email].downcase
    password = params[:session][:password]
    user = User.find_by_email(email, password )
    if user
      log_in(user)
      render json: user
    else
      render json: ['Invalid Credentials'], status: 401
    end
  end

  def destroy
    if current_user
      log_out
      render json: {}
    else
      render json: ['There is no user logged in.'], status: 404
    end
  end
end
