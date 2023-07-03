class UsersController < ApplicationController
  def create
      p "@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      p params
      p "@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      Rails.logger.debug request.body.read
      p "@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id
      render json: { success: true }
    else
      render json: { success: false, message: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
