class ChangedUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image, :bio
end
