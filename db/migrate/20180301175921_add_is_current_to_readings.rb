class AddIsCurrentToReadings < ActiveRecord::Migration[5.1]
  def change
    add_column :readings, :is_current, :boolean, default: true, null: false
  end
end
