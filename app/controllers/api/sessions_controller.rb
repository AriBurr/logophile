class Api::SessionsController < ApplicationController
<<<<<<< HEAD
  def create
    email = params[:session][:email].downcase
    password = params[:session][:password]
    user = User.find_by_email(email, password )
    if user
      log_in(user)
=======

  def create
    email = params[:session][:email].downcase
    password = params[:session][:password]
    user = User.find_by_email(email, password)
    if user
      log_in(user)
      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
>>>>>>> adv-login
      render json: user
    else
      render json: ['Invalid Credentials'], status: 401
    end
  end

  def destroy
<<<<<<< HEAD
=======
    binding.pry
>>>>>>> adv-login
    if current_user
      log_out
      render json: {}
    else
      render json: ['There is no user logged in.'], status: 404
    end
  end
<<<<<<< HEAD
=======

>>>>>>> adv-login
end
