class CreateBookshelves < ActiveRecord::Migration[5.1]
  def change
    create_table :bookshelves do |t|
      t.string :name, null: false
      t.integer :book_count, default: 0
      t.belongs_to :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
