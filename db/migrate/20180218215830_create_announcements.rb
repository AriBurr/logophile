class CreateAnnouncements < ActiveRecord::Migration[5.1]
  def change
    create_table :announcements do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.belongs_to :club, foreign_key: true, null: false

      t.timestamps
    end
  end
end
