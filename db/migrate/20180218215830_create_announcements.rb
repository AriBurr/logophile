class CreateAnnouncements < ActiveRecord::Migration[5.1]
  def change
    create_table :announcements do |t|
      t.text :body, null: false
      t.belongs_to :club, foreign_key: true, null: false

      t.timestamps
    end
  end
end
