class FollowRelationshipsController < ApplicationController
    before_action :set_follow, only: [:destroy]

    def following
        following_users = current_user.active_relationships.map(&:followed)
        render json: { success: true, followed_user: following_users}
    end

    def create
        follow = current_user.active_relationships.build(followed_id: params[:followed_id])
        if follow.save
            render json: { success: true, followed_user: follow.followed }
        else
            render json: { success: false, errors: follow.errors.full_messages }
        end
    end
    
    def destroy
        if @follow.destroy
            render json: { success: true, unfollowed_user: @follow.followed }
        else
            render json: { success: false, errors: @follow.errors.full_messages }
        end
    end

    private

    def set_follow
    		@follow = current_user.active_relationships.find_by(followed_id: params[:id])
        unless @follow
            render json: { success: false, message: "Relationship not found." }
        end
    end
end
