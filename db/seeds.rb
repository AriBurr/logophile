User.destroy_all
5.times do |n|
  User.create(
    name: "Test#{n}",
    email: "test#{n}@test.com",
    password: "password",
    password_confirmation: "password"
  )
end
