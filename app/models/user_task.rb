class UserTask < ApplicationRecord
  belongs_to :user
  belongs_to :task

  validates :task_id, uniqueness: { scope: [:user_id], message: "You are already assigned to this task." }

end
