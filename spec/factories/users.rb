FactoryBot.define do
  sequence :email do |number|
    "test_#{number}@test.com"
  end

  factory :user do
    name "Test"
    email
    password "password"
  end
end
