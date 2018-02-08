class Bookshelf < ApplicationRecord
  validates_presence_of :name, :user_id, :book_count

  belongs_to :user
  has_many :shelvings, dependent: :destroy
  has_many :books, through: :shelvings

  def self.change_count(action, bookshelf)
    case action
      when 'inc'
        bookshelf.update(book_count: bookshelf.book_count += 1)
      when 'dec'
        bookshelf.update(book_count: bookshelf.book_count -= 1)
    end
    bookshelf
  end

end
