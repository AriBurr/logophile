FactoryBot.define do
  sequence :name do |n|
    "test#{n}"
  end


  factory :bookshelf do
    name
    book_count 0
    user_id 1
  end
end
