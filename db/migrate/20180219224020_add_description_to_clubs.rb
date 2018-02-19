class AddDescriptionToClubs < ActiveRecord::Migration[5.1]
  def change
    add_column :clubs, :description, :text
  end
end
