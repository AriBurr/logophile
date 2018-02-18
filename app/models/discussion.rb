class Discussion < ApplicationRecord
  validates_presence_of :title, :content, :reading_id, :user_id

  belongs_to :reading
  belongs_to :user
  has_many :comments, dependent: :destroy
end
