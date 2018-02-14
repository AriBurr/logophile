class CreateShelvings < ActiveRecord::Migration[5.1]
  def change
    create_table :shelvings do |t|
      t.belongs_to :book, foreign_key: true, null: false
      t.belongs_to :bookshelf, foreign_key: true, null: false

      t.timestamps
    end
  end
end
