# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180301203103) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "announcements", force: :cascade do |t|
    t.text "body", null: false
    t.bigint "club_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["club_id"], name: "index_announcements_on_club_id"
  end

  create_table "books", force: :cascade do |t|
    t.jsonb "item", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bookshelves", force: :cascade do |t|
    t.string "name", null: false
    t.integer "book_count", default: 0
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_bookshelves_on_user_id"
  end

  create_table "clubs", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
  end

  create_table "comments", force: :cascade do |t|
    t.text "content", null: false
    t.bigint "discussion_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["discussion_id"], name: "index_comments_on_discussion_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "discussions", force: :cascade do |t|
    t.string "title", null: false
    t.text "content", null: false
    t.bigint "reading_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reading_id"], name: "index_discussions_on_reading_id"
    t.index ["user_id"], name: "index_discussions_on_user_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "club_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_moderator", default: false, null: false
    t.index ["club_id"], name: "index_memberships_on_club_id"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.integer "value"
    t.bigint "user_id", null: false
    t.bigint "book_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_ratings_on_book_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "readings", force: :cascade do |t|
    t.bigint "club_id", null: false
    t.bigint "book_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_current", default: true, null: false
    t.date "start_date", null: false
    t.date "finish_date", null: false
    t.index ["book_id"], name: "index_readings_on_book_id"
    t.index ["club_id"], name: "index_readings_on_club_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "rating"
    t.text "body"
    t.bigint "user_id"
    t.bigint "book_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_reviews_on_book_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "shelvings", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.bigint "bookshelf_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_shelvings_on_book_id"
    t.index ["bookshelf_id"], name: "index_shelvings_on_bookshelf_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "token"
    t.datetime "token_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["token", "token_created_at"], name: "index_users_on_token_and_token_created_at"
    t.index ["token"], name: "index_users_on_token"
  end

  add_foreign_key "announcements", "clubs"
  add_foreign_key "bookshelves", "users"
  add_foreign_key "comments", "discussions"
  add_foreign_key "comments", "users"
  add_foreign_key "discussions", "readings"
  add_foreign_key "discussions", "users"
  add_foreign_key "memberships", "clubs"
  add_foreign_key "memberships", "users"
  add_foreign_key "ratings", "books"
  add_foreign_key "ratings", "users"
  add_foreign_key "readings", "books"
  add_foreign_key "readings", "clubs"
  add_foreign_key "shelvings", "books"
  add_foreign_key "shelvings", "bookshelves"
end
