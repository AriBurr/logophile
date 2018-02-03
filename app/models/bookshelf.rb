class Bookshelf < ApplicationRecord
  validates_presence_of :name, :user_id

  belongs_to :user
  has_many :shelvings
  has_many :books, through: :shelvings

end
