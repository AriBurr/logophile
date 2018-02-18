class Reading < ApplicationRecord
  validates_presence_of :book_id, :club_id
  validates_uniqueness_of :book_id, { scope: :club_id }

  belongs_to :club
  belongs_to :book
  has_many :discussions, dependent: :destroy
end
