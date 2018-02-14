require 'rails_helper'

RSpec.describe Book, type: :model do

 describe 'attributes' do
   it { should respond_to :item }
 end

 describe 'validations' do
   it { should validate_presence_of(:item) }
 end

 # describe 'class methods' do
 #   it '.check_if_duplicate -create book if not duplicate' do
 #     book = Book.create(item: { etag: 'abc' })
 #     Book.create(item: { etag: 'abc' }) if book.item['etag']
 #     Book.create(item: { etag: 'efg' }) if book.empty?
 #     expect(Book.all.count).to eq(2)
 #   end
 #   it '.check_if_duplicate -create book if not duplicate'
 # end

end

# def self.check_if_duplicate(book_params)
#   book = Book.where("item->>'etag' = ?", book_params['etag'])
#   if book.empty?
#     Book.create(item: book_params)
#   else
#     book[0]
#   end
# end
