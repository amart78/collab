puts "Seeding commencing in 3...2...1..."

# User.destroy_all
# -------------------------------------------------------------------------------------

alexis = User.create( name: 'Alexis', email: 'alexis@flatiron.com' , image: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png', bio: 'Team Lead & dog mom', admin: true, password: 'am123') 
sam = User.create(name: 'Sam', email: 'sam@flatiron.com', image: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Rabbit-512.png', bio: '#1 Instructor & emoji extraordinaire', admin: false, password: 'sb123')
hamilton = User.create(name: 'Hamilton', email: 'hamilton@flatiron.com' , image: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png', bio: 'Creative Visionary & chonky bork boy', admin: false, password: 'hd123')

puts "User seeding complete."

# -------------------------------------------------------------------------------------
frontend = Project.create(name: 'Front End', image: 'https://cdn-icons-png.flaticon.com/512/2620/2620735.png')
backend = Project.create( name: 'Back End', image: 'https://www.pngfind.com/pngs/m/664-6641360_backend-icon-hd-png-download.png')

frontend.members =[alexis, sam]
backend.members =[alexis, hamilton]

puts "Project seeding complete."

# -------------------------------------------------------------------------------------
navbar = frontend.tasks.create(
  user: alexis,
  title: 'Create Navbar',
  description: 'Design & code a navbar for the top of the app including functionality',
  due_date: '2022-06-01 11:30:00'
)

navbar.assignees = [alexis, sam]

filter = frontend.tasks.create(
  user: alexis,
  title: 'Create filter menu',
  description: 'Filter menu is needed to filter by: type, color & size.',
  due_date: '2022-06-01 11:30:00'
)

filter.assignees = [sam]

seeding = backend.tasks.create(
  user: alexis,
  title: 'Create seed data',
  description: 'Confirm column categories needed & their types. Then, add seed data to seeds.rb accordingly.',
  due_date: '2022-05-30 14:30:00'
)

seeding.assignees = [hamilton]

puts "Task seeding complete"

# -------------------------------------------------------------------------------------

puts "Seeding successful!"

