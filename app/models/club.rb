class Club < ApplicationRecord
  validates_presence_of :name

  has_one :announcement, dependent: :destroy

  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships

  has_many :readings, dependent: :destroy
  has_many :books, through: :readings

  after_create :build_default_announcement

  def self.find_user_clubs(user_id)
    select("clubs.id, clubs.name, clubs.description, memberships.is_moderator")
    .joins("INNER JOIN memberships ON clubs.id = memberships.club_id")
    .joins("INNER JOIN users ON memberships.user_id = users.id")
    .where("users.id = #{user_id}")
  end

  def self.with_moderator_status(user_id, club)
    select("clubs.id, clubs.name, clubs.description, clubs.created_at, memberships.is_moderator")
    .joins("INNER JOIN memberships ON clubs.id = memberships.club_id")
    .joins("INNER JOIN users ON memberships.user_id = users.id")
    .where("users.id = #{user_id} AND clubs.id = #{club.id}")
  end

  private

    def build_default_announcement
      Announcement.create(body: 'Thanks for supporting the logophile community, this is where you can make announcments to the members of your book club',
        club_id: self.id)
    end

end
