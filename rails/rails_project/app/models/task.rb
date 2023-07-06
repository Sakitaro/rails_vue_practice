class Task < ApplicationRecord
  belongs_to :user

  has_many :likes
  has_many :likers, through: :likes, source: :user

  validates :content, presence: true

  def likers_count
    self.likes.count
  end
end
