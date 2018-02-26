class Membership < ApplicationRecord
  validates_presence_of :club_id, :user_id
  validates_uniqueness_of :user_id, { scope: :club_id }

  belongs_to :user
  belongs_to :club
end
