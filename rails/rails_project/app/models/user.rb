class User < ApplicationRecord
    has_secure_password
    has_many :tasks
    validates :name, presence: true, uniqueness: { case_sensitive: false }
    validates :email, presence: true, uniqueness: { case_sensitive: false }
    validates :password, presence: true
end
