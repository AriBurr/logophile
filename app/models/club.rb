class Club < ApplicationRecord
  validates_presence_of :name

  has_one :announcement, dependent: :destroy

  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships

  has_many :readings, dependent: :destroy
  has_many :books, through: :readings

  after_create :build_default_announcement

  def self.with_current_reading
    select("clubs.id, clubs.name, clubs.description, books.item")
    .joins("LEFT JOIN readings ON clubs.id = readings.club_id")
    .joins("LEFT JOIN books ON readings.book_id = books.id")
    .where("readings.is_current = true OR readings.is_current IS NULL")
  end

  def self.find_user_clubs(user_id)
    select("clubs.id, clubs.name, clubs.description, memberships.is_moderator, books.item")
    .joins("LEFT JOIN readings ON clubs.id = readings.club_id")
    .joins("LEFT JOIN books ON readings.book_id = books.id")
    .joins("INNER JOIN memberships ON clubs.id = memberships.club_id")
    .joins("INNER JOIN users ON memberships.user_id = users.id")
    .where("users.id = #{user_id} AND readings.is_current = true OR readings.is_current IS NULL")
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
