class CreateBookshelves < ActiveRecord::Migration[5.1]
  def change
    create_table :bookshelves do |t|
      t.string :name, null: false
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
