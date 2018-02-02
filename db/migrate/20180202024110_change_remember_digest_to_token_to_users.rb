class ChangeRememberDigestToTokenToUsers < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :remember_digest, :token
  end
end
