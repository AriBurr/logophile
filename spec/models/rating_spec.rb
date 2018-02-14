require 'rails_helper'

RSpec.describe Rating, type: :model do

 describe 'attributes' do
   it { should respond_to :value }
   it { should respond_to :book_id }
   it { should respond_to :user_id }
 end

 describe 'validations' do
   it { should validate_presence_of(:value) }
   it { should validate_presence_of(:book_id) }
   it { should validate_presence_of(:user_id) }
 end

 context 'uniqueness validators' do
   it { should validate_uniqueness_of(:book_id).scoped_to(:user_id).with_message("You've reviewed this book!") }
 end

end
