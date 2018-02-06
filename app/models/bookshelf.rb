class Bookshelf < ApplicationRecord
  validates_presence_of :name, :user_id, :book_count

  belongs_to :user
  has_many :shelvings, dependent: :destroy
  has_many :books, through: :shelvings

end
