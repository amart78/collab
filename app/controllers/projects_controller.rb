class ProjectsController < ApplicationController
    def index
        projects = Project.all.includes(:user_projects)
        render json: projects, each_serializer: ProjectIndexSerializer
      end
    
      def show
        render json: Project.find(params[:id])
      end
    
      def create
        project = Project.new(project_params)
        if project.save
          render json: project, status: :created
        else
          render json: project.errors, status: :unprocessable_entity
        end
      end
    
      private
    
      def project_params
        params.permit(:name, :image)
      end
end
