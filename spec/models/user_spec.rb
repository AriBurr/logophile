require 'rails_helper'

RSpec.describe User, type: :model do

 describe 'attributes' do
   it { should respond_to :name }
   it { should respond_to :email }
 end

 describe 'validations' do
   it { should validate_presence_of(:name) }
 end

end
