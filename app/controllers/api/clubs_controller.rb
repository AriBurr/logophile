class Api::ClubsController < ApiController
  before_action :require_login
  before_action :set_club, only: [:show, :update, :destroy], except: [:find_user_clubs]

  def index
    render json: Club.with_current_reading
  end

  def find_user_clubs
    clubs = Club.find_user_clubs(current_user.id)
    render json: clubs
  end

  def show
    club = Club.with_moderator_status(current_user.id, @club)
    created = club[0].created_at.strftime('%A %e %Y')
    render json: club, created_format: created
  end

  def create
    club = Club.new(club_params)
    if club.save
      render json: club
    else
      render json: { errors: club.full_messages }, status: 422
    end
  end

  def update
    if @club.update(club_params)
      render json: @club
    else
      render json: { errors: @club.full_messages }, status: 422
    end
  end

  def destroy
    @club.destroy
  end

  private
    def club_params
      params.require(:club).permit(:name, :description)
    end

    def set_club
      @club = Club.find(params[:id])
    end

end
