class AddIsModeratorToMemberships < ActiveRecord::Migration[5.1]
  def change
    add_column :memberships, :is_moderator, :boolean, null: false
  end
end
