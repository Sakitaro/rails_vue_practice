class LikesController < ApplicationController
    before_action :authenticate_user!

    def create
        task = Task.find(params[:task_id])
        like = Like.new(user_id: current_user.id, task_id: task.id)
        if like.save
            render json: { success: true, like: like}
        else
            render json: { success: false, message: like.errors }
        end
    end

    def destroy
        task = Task.find(params[:task_id])
        like = Like.find_by(user_id: current_user.id, task_id: task.id)
        # オブジェクトが存在しているときとでない時の条件分岐
        if like
            like.destroy
            render json: { success: true, unlike: like}
        else
            render json: { success: false, message: like.errors }
        end
    end
end
