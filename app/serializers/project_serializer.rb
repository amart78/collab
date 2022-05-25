class ProjectSerializer < ProjectIndexSerializer
  # attributes :id, :name, :image
  has_many :tasks
  has_many :members
end
