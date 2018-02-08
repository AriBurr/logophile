class Shelving < ApplicationRecord
  validates_presence_of :bookshelf_id, :book_id
  validates_uniqueness_of :book_id, { scope: :bookshelf_id }

  belongs_to :book
  belongs_to :bookshelf

  # SELECT books.item, books.id AS book_id, shelvings.id AS shelving_id
  # FROM shelvings
  # INNER JOIN books ON shelvings.book_id = books.id
  # WHERE shelvings.bookshelf_id = 5

  def self.with_book(shelf_id)
    select("books.item, books.id, shelvings.id")
    .joins("INNER JOIN books ON shelvings.book_id = books.id")
    .where("shelvings.bookshelf_id = #{shelf_id}")
  end
  # def self.with_book(shelf_id)
  #   select("books.item, books.id AS book_id, shelvings.id AS shelving_id, bs.id")
  #   .joins("INNER JOIN bookshelves AS bs ON shelvings.bookshelf_id = bs.id")
  #   .joins("INNER JOIN shelvings AS s ON books.id = s.book_id")
  #   .where("bs.id = #{shelf_id}")
  # end
end
