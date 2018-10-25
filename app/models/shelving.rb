class Shelving < ApplicationRecord
  validates_presence_of :bookshelf_id, :book_id
  validates_uniqueness_of :book_id, scope: :bookshelf_id

  belongs_to :book
  belongs_to :bookshelf

  def self.with_book(shelf_id)
    select("books.item, books.id, shelvings.id AS shelving_id, shelvings.bookshelf_id")
      .joins("INNER JOIN books ON shelvings.book_id = books.id")
      .where("shelvings.bookshelf_id = #{shelf_id}")
  end
end
