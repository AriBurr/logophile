require 'api_controller'

module ControllerMacros
  def login_user
    before(:each) do
      @user = FactoryBot.create(:user)
      @headers = { Authorization: "Token token=#{@user.token}" }
    end
  end
end
