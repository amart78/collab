class Task < ApplicationRecord
  belongs_to :user
  belongs_to :project

  has_many :user_tasks, dependent: :destroy
  has_many :assignees, through: :user_tasks, source: :user

  validates :title, :description, :due_date, presence: true
  validates :title, uniqueness: {message: "There is a task that has this title already."}

  def project_name=(project_name)
    self.project = Project.find_or_create_by(name: project_name)
  end

end
