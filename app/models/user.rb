class User < ApplicationRecord
  before_save { email.downcase! }

  validates :name, presence: true, length: { maximum: 50 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }

  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)                                                    
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  # def is_password?(password)
  #   BCrypt::Password.new(self.password_digest).is_password(password)
  # end

  def self.find_by_email(email, password)
    user = User.find_by_email(email)
    if user && user.authenticate(password)
      user
    end
    nil
  end

end
