class Comment < ApplicationRecord
  validates_presence_of :content, :discussion_id, :user_id

  belongs_to :discussion
  belongs_to :user
end
