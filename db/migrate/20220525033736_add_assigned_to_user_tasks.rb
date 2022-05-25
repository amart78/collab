class AddAssignedToUserTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :user_tasks, :assigned, :boolean
  end
end
