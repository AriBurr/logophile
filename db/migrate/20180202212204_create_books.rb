class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.jsonb :item
      t.belongs_to :bookshelf, index: true

      t.timestamps
    end
  end
end
