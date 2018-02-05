class User < ApplicationRecord
  has_secure_password
  has_secure_token

  has_many :bookshelves, dependent: :destroy
  has_many :reviews

  before_save { email.downcase! }

  validates :name, presence: true, length: { maximum: 50 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  # validates :password, presence: true, length: { minimum: 5 }

  after_create :build_default_bookshelves

  def self.valid_login?(email, password)
   user = find_by(email: email)
   if user && user.authenticate(password)
     user
   end
 end

 def build_default_bookshelves
   Bookshelf.create(name: 'Read', user_id: self.id)
   Bookshelf.create(name: 'Will Read', user_id: self.id)
 end

 def allow_token_to_be_used_only_once
   regenerate_token
   touch(:token_created_at)
 end

 def logout
   invalidate_token
 end

 def self.with_unexpired_token(token, period)
   where(token: token).where('token_created_at >= ?', period).first
 end

 private

 # This method is not available in has_secure_token
 def invalidate_token
   update_columns(token: nil)
   touch(:token_created_at)
 end


end
