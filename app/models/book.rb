class Book < ApplicationRecord
  validates_presence_of :item

  has_many :shelvings, dependent: :destroy
  has_many :bookshelves, through: :shelvings
  has_many :reviews, dependent: :destroy

  def self.check_if_duplicate(book_params)
    book = Book.where("item->>'etag' = ?", book_params['etag'])
    if book.empty?
      Book.create(item: book_params) && nil
    else
      book[0]
    end
  end


  def self.change_count(action, bookshelf)
    case action
      when 'inc'
        bookshelf.update(book_count: bookshelf.book_count += 1)
      when 'dec'
        bookshelf.update(book_count: bookshelf.book_count -= 1)
    end
  end
end
