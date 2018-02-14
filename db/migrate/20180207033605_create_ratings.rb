class CreateRatings < ActiveRecord::Migration[5.1]
  def change
    create_table :ratings do |t|
      t.integer :value
      t.belongs_to :user, foreign_key: true, null: false
      t.belongs_to :book, foreign_key: true, null: false

      t.timestamps
    end
  end
end
