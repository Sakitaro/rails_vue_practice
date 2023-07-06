class LikesController < ApplicationController
    def index
        @likes = current_user.likes
        render json: { success: true, likes: @likes}
    end

    def create
        task = Task.find(params[:task_id])
        like = Like.new(user_id: current_user.id, task_id: task.id)
        if like.save
            task.reload #タスクの更新
            p task.as_json(methods: :likers_count)
            render json: { success: true, like: like, task: task.as_json(include: :user, methods: :likers_count)}
        else
            render json: { success: false, message: like.errors }
        end
    end

    def destroy
        task = Task.find(params[:id])
        unlike = Like.find_by(user_id: current_user.id, task_id: task.id)
        # オブジェクトが存在しているときとでない時の条件分岐
        if unlike
            unlike.destroy
            task.reload
            render json: { success: true, unlike: unlike, task: task.as_json(include: :user, methods: :likers_count)}
        else
            render json: { success: false, message: unlike.errors }
        end
    end
end
