class ChangeDateTypeInReadings < ActiveRecord::Migration[5.1]
  def change
    change_column :readings, :start_date, :string
    change_column :readings, :finish_date, :string
  end
end
