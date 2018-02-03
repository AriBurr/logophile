class Book < ApplicationRecord
  validates_presence_of :item

  has_many :shelvings
  has_many :bookshelves, through: :shelvings
  has_many :reviews, dependent: :destroy
end
