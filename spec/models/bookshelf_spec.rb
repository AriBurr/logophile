require 'rails_helper'

RSpec.describe Bookshelf, type: :model do

 describe 'attributes' do
   it { should respond_to :name }
   it { should respond_to :book_count }
   it { should respond_to :user_id }
 end

 describe 'validations' do
   it { should validate_presence_of(:name) }
   it { should validate_presence_of(:book_count) }
   it { should validate_presence_of(:user_id) }
 end

end
