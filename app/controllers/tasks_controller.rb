class TasksController < ApplicationController

  def index
    tasks = Task.all.includes(:user_tasks)
    render json: tasks, each_serializer: TaskIndexSerializer
  end

  def show
    task = Task.find(params[:id])
    render json: task
  end

  def create
    task = current_user.tasks.build(task_params)
    if task.save
      render json: task, status: :created
    else
      render json: task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    task = current_user.tasks.find(params[:id])
    if task.update(task_params)
      render json: task, status: :ok
    else
      render json: task.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    task = current_user.created_tasks.find(params[:id])
    task.destroy
    render json: task, status: :ok
  end

  private

  def task_params
    params[:user_id] = current_user.id
    params.permit(:title, :description, :due_date, :task_name, :project_id, :user_id)
  end
end


 