class Book < ApplicationRecord
  validates_presence_of :item

  has_many :shelvings, dependent: :destroy
  has_many :bookshelves, through: :shelvings
  has_many :ratings, dependent: :destroy

  def self.check_if_duplicate(book_params)
    book = Book.where("item->>'etag' = ?", book_params['etag'])
    if book.empty?
      Book.create(item: book_params)
    else
      book[0]
    end
  end

  # select DISTINCT books.item, r.book_id, count(r.book_id), AVG(r.value)
  # FROM books
  # INNER JOIN ratings as r on books.id = r.book_id
  # GROUP BY r.book_id, books.item
  # ORDER BY r.book_id ASC

  def self.only_with_ratings
    Book.select(
      [
        Book.arel_table[:item], R.arel_table[:book_id], R.arel_table[:book_id].count, R.arel_table[:value].average
      ]
    ).joins(
      Book.arel_table.join(Rating.arel_table).on(Book.arel_table[:id].eq(R.arel_table[:book_id])).join_sources
    ).order(R.arel_table[:book_id]).group(R.arel_table[:book_id], Book.arel_table[:item]).uniq
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
