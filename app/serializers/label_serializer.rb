class LabelSerializer < ActiveModel::Serializer
  attributes :id, :typ, :position, :description

  def created_at
    object.created_at.strftime('%m-%d')
  end

  def user_name
    object.user.name
  end

  def include_user_name?
    object.user
  end
end
