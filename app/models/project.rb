class Project < ApplicationRecord
    has_many :user_projects
    has_many :members, through: :user_projects, source: :user
    has_many :tasks

    validates :name, presence: true, uniqueness: true
end
