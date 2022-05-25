class TaskIndexSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :due_date, :user_task, :user_is_creator

  def user_task
    current_user.user_tasks.find_by(task_id: object.id)
  end

  def user_is_creator
    current_user == object.user
  end

end
