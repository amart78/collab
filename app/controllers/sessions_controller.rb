class SessionsController < ApplicationController
    skip_before_action :confirm_authentication, only: [:create]
    
    def create
        user = User.find_by_email(params[:email])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user, status: :ok
        else
          render json: {error: 'invalid email or password'}, status: :unauthorized
        end
    end
    
    def destroy
        session.delete(:user_id)
        head :no_content
    end
end
