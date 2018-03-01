class AddStartFinishDateToReading < ActiveRecord::Migration[5.1]
  def change
    add_column :readings, :start_date, :date, null: false
    add_column :readings, :finish_date, :date, null: false
  end
end
