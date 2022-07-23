class UserProjectsController < ApplicationController
      def index
        render json: current_user.user_projects, status: :ok
      end
    
      def create
        user_project = current_user.user_projects.build(user_project_params)
        if user_project.save
          render json: user_project, status: :created
        else 
          render json: user_project.errors.full_messages, status: :unprocessable_entity
        end
      end
    
      def destroy
        user_project = current_user.user_projects.find(params[:id])
        user_project.destroy
        render json: user_project, status: :ok
      end
    
      private
    
      def user_project_params
        params.permit(:project_id, :member)
      end
end
