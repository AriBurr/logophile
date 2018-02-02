class ApiController < ApplicationController

  def require_login
    authenticate_token || render_unauthorized("Access denied")
  end

  def current_user
    @current_user ||= authenticate_token
  end

  def log_in
    if user = User.valid_login?(params[:email], params[:password])
      user.allow_token_to_be_used_only_once
      send_auth_token_for_valid_login_of(user)
    else
      render_unauthorized("Error with your login or password")
    end
  end

  protected
    def render_unauthorized(message)
      errors = {errors: [ {detail: message } ] }
      render json: errors, status: :unauthorized
    end

    private

    def authenticate_token
      authenticate_with_http_token do |token, options|
        if user = User.with_unexpired_token(token, 2.days.ago)
        # Compare the tokens in a time-constant manner, to mitigate timing attacks.
          ActiveSupport::SecurityUtils.secure_compare(
                          ::Digest::SHA256.hexdigest(token),
                          ::Digest::SHA256.hexdigest(user.token))
          user
        end
      end
    end
end