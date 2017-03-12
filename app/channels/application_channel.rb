class ApplicationChannel < ApplicationCable::Channel
  def subscribed
    set_retrospective
    if @retrospective
      stream_for params[:room]
    end
  end

  def set_retrospective
    @retrospective = current_user.retrospectives.find_by(id: params[:room])
  end

  def authenticate_retrospective?
    RetrospectivesUser.find_by(retrospective_id: params[:room], user: current_user).present?
  end
end
