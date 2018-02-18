class CreateReadings < ActiveRecord::Migration[5.1]
  def change
    create_table :readings do |t|
      t.belongs_to :club, foreign_key: true, null: false
      t.belongs_to :book, foreign_key: true, null: false

      t.timestamps
    end
  end
end
