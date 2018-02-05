class Book < ApplicationRecord
  validates_presence_of :item

  has_many :shelvings, dependent: :destroy
  has_many :bookshelves, through: :shelvings
  has_many :reviews, dependent: :destroy
end
