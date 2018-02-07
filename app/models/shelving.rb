class Shelving < ApplicationRecord
  validates_presence_of :bookshelf_id, :book_id
  validates_uniqueness_of :book_id, { scope: :bookshelf_id }

  belongs_to :book
  belongs_to :bookshelf

  def self.with_book(shelf_id)
    select('books.item AS book_id, books.id, shelvings.id AS shelving_id')
    .join('INNER JOIN shelvings AS s ON books.id = s.book_id
           INNER JOIN bookshelves AS bs ON shelvings.bookshelf_id = bs.id')
    .where('bs.id = ?', shelf_id )
  end
end
