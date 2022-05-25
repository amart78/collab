class User < ApplicationRecord
    has_many :user_projects
    has_many :projects, through: :user_projects
    has_many :created_projects, class_name: 'Project'

    has_many :user_tasks
    has_many :tasks, through: :user_tasks
    has_many :created_tasks, class_name: 'Task'

    validates :email, presence: true, uniqueness: true
    
    has_secure_password
    
end
