class Api::AnnouncementsController < ApplicationController

  def index

  end

  def create
    announcement = Announcement.new(announcement_params)
    if announcment.save
      render json: announcement
    else
      render json: { announcement.errors.full_messages }, status: 422
    end
  end

  def update
    announcment = Announcment.find(params[:id])
    if announcment.update(announcement_params)
      render json: announcement
    else
      render json: { errors: announcement.errors.full_messages }, status: 422
    end
  end

  private

    def announcement_params
      params.require(:announcement).permit(:body, :club_id)
    end

end
