class AddIsModeratorToMemberships < ActiveRecord::Migration[5.1]
  def change
    add_column :memberships, :is_moderator, :boolean, default: false, null: false
  end
end
