class Reading < ApplicationRecord
  validates_presence_of :book_id, :club_id
  validates_uniqueness_of :book_id, { scope: :club_id }

  belongs_to :club
  belongs_to :book
  has_many :discussions, dependent: :destroy


  def self.handle_archive(id)
    to_archive = Reading.find(id)
    to_archive.is_current = false
    to_archive.save
  end

  def self.find_current(club)
    select("books.item, books.id, readings.id AS reading_id, readings.club_id")
    .joins("INNER JOIN books ON readings.book_id = books.id")
    .where("readings.club_id = #{club.id} AND readings.is_current = true")
  end

end
