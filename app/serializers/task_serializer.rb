class TaskSerializer < TaskIndexSerializer
  # attributes :id, :title, :description, :due_date, creator
  # has_one :user
  # has_one :project

  has_many :assignees

  belongs_to :project, serializer: TaskProjectSerializer
  attribute :creator

  def creator
    object.user.name
  end

end
