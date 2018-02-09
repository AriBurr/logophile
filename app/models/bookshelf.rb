class Bookshelf < ApplicationRecord
  validates_presence_of :name, :user_id, :book_count

  belongs_to :user
  has_many :shelvings, dependent: :destroy
  has_many :books, through: :shelvings

  def self.handle_count(to_shelf, from_shelf)
    from = Bookshelf.find(from_shelf)
    to = Bookshelf.find(to_shelf)
    Bookshelf.change_count('inc', to)
    Bookshelf.change_count('dec', from)
  end

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
