class ApplicationController < ActionController::API
<<<<<<< HEAD
  protect_from_forgery with: :exception
=======

  helper_method :current_user, :logged_in?
>>>>>>> adv-login

  def log_in(user)
    session[:session_token] = user.id
  end

<<<<<<< HEAD
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
=======

  def current_user
    @current_user ||= User.find_by_id(session[:user])
  end

  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  # def current_user
  #   if (user_id = session[:user_id])
  #     @current_user ||= User.find_by(id: user_id)
  #   elsif (user_id = cookies.signed[:user_id])
  #     user = User.find_by(id: user_id)
  #     if user && user.authenticated?(cookies[:remember_token])
  #       log_in user
  #       @current_user = user
  #     end
  #   end
  # end

  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
>>>>>>> adv-login
  end

  def logged_in?
    !current_user.nil?
  end

  def log_out
<<<<<<< HEAD
=======
    forget(current_user)
>>>>>>> adv-login
    session.delete(:user_id)
    @current_user = nil
  end
end
