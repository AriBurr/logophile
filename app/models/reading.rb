class Reading < ApplicationRecord
  belongs_to :club
  belongs_to :book
  has_many :discussions, dependent: :destroy
end
