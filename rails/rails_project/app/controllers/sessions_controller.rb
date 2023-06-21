class SessionsController < ApplicationController
    def create
      #リクエストのパラメータ確認用
      p "@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      p params
      p "@@@@@@@@@@@@@@@@@@@@@@@@@@@@"  
      Rails.logger.debug request.body.read
      p "@@@@@@@@@@@@@@@@@@@@@@@@@@@@"  
      
      user = User.find_by(email: params[:session][:emailOrName]) || User.find_by(name: params[:session][:emailOrName])

      if user && user.authenticate(params[:session][:password])
        session[:user_id] = user.id
        render json: { success: true }
      else
        render json: { success: false, message: 'Invalid email or password' }, status: :unauthorized
      end
    end

    def destroy
      log_out if logged_in?
      render json: { success: true }
    end
end
