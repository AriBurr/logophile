class Announcement < ApplicationRecord
  validates_presence_of :body, :club_id

  belongs_to :club
end
