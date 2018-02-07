class Rating < ApplicationRecord

  validates_presence_of :value, :user_id, :book_id
  validates :book_id, uniqueness: { scope: :user_id, message: "You've reviewed this book!" }

  belongs_to :user
  belongs_to :book

end
