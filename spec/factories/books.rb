FactoryBot.define do

  factory :book do
    item { {kind: "books#volume", id: "12345"} }
  end
end
