class TasksController < ApplicationController

  def all
    allTasks = Task.all
    render json: { success: true, allTasks: allTasks.as_json(include: :user) }
  end

  def index
    tasks = current_user.tasks
    render json: { success: true, tasks: tasks.as_json(include: :user) }
  end

  def create
    task = Task.new(task_params)
    task.user_id = current_user.id

    if task.save
      render json: { success: true, task: task.as_json(include: :user) }
    else
      render json: { success: false, message: task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    task = current_user.tasks.find(params[:id])

    if task.update(task_params)
      render json: { success: true, task: task }
    else
      render json: { success: false, message: task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # 安全性のため
  def task_params
    params.require(:task).permit(:content, :completed)
  end
end
