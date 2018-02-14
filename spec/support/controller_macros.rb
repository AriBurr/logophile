require 'api_controller'

module ControllerMacros
  def login_user
    before(:each) do
      @user = FactoryBot.create(:user)
      log_in @user
    end
  end
end
