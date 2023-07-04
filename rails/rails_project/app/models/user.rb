class User < ApplicationRecord
    has_secure_password
    has_many :tasks
    validates :name, presence: true, uniqueness: { case_sensitive: false }
    validates :email, presence: true, uniqueness: { case_sensitive: false }
    validates :password, presence: true

    has_many :active_relationships, class_name: "FollowRelationship", foreign_key: "follower_id", dependent: :destroy
    has_many :passive_relationships, class_name: "FollowRelationship", foreign_key: "followed_id", dependent: :destroy

    has_many :following, through: :active_relationships, source: :followed
    has_many :followers, through: :passive_relationships, source: :follower

    has_many :likes, dependent: :destroy
    has_many :like_tasks, through: :likes, source: :task
end
