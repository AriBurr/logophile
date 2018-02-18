class Club < ApplicationRecord
  has_many :announcements, dependent: :destroy

  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships

  has_many :readings, dependent: :destroy
  has_many :books, through: :readings
end
