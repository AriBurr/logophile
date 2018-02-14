require 'rails_helper'

RSpec.describe Shelving, type: :model do

  describe 'attributes' do
    it { should respond_to :book_id }
    it { should respond_to :bookshelf_id }
  end

  describe 'validations' do
    it { should validate_presence_of(:book_id) }
    it { should validate_presence_of(:bookshelf_id) }
  end

  context 'uniqueness validators' do
    it { should validate_uniqueness_of(:book_id).scoped_to(:bookshelf_id) }
  end

end
