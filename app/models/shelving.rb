class Shelving < ApplicationRecord
  validates_presence_of :bookshelf_id
  validates_uniqueness_of :book_id, { scope: :bookshelf_id }

  belongs_to :book
  belongs_to :bookshelf
end
