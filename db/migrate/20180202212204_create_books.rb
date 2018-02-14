class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.jsonb :item, null: false

      t.timestamps
    end
  end
end
