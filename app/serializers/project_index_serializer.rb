class ProjectIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :user_project

  def user_project
    current_user.user_projects.find_by(project_id: object.id)
  end
end
