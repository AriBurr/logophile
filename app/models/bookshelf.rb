class Bookshelf < ApplicationRecord
  validates_presence_of :name, :user_id

  belongs_to :user
  has_many :shelvings, dependent: :destroy
  has_many :books, through: :shelvings

  def self.with_book_count(user)
    data = user.bookshelves.all.order(created_at: :asc).map do |shelf|
      shelf = {
        shelf: shelf,
        count: shelf.books.count
      }
    end
  end

end
