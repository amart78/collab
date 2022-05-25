class UserProject < ApplicationRecord
  belongs_to :user
  belongs_to :project

  validates :project_id, uniqueness: { scope: [:user_id], message: "You are already a member of this project." }

end
