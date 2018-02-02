class AddAuthTokenIndexToUsers < ActiveRecord::Migration[5.1]
  def change
    add_index :users, :token
  end
end
