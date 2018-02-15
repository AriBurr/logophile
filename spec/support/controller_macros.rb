require 'api_controller'

module ControllerMacros
  def login_user
    before(:each) do
      @user = FactoryBot.create(:user)
      # ApiController.any_instance.stub(:log_in).and_return(User.first)
      @headers = { Authorization: "Token token=#{@user.token}" }
    end
  end
end
