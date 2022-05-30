class UserTasksController < ApplicationController
    def index
    render json: current_user.user_tasks, status: :ok
  end

  def create
    user_task = current_user.user_tasks.build(user_task_params)
    if user_task.save
      render json: user_task, status: :created
    else
      render json: user_task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    user_task = UserTask.find(params[:id])
    if user_task.update(user_task_params)
      render json: user_task, status: :ok
    else
      render json: user_task.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    user_task = current_user.user_tasks.find(params[:id])
    user_task.destroy
    render json: user_task, status: :ok
  end

  private

  def user_task_params
    params.permit(:task_id, :assigned)
  end
end
