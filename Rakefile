PORT = 4000
HOST = '127.0.0.1'.freeze

desc "Serve the site at http://#{HOST}:#{PORT}, rebuilding on file changes"
task :serve do
  sh "bundle exec jekyll serve --host #{HOST} --port #{PORT} --watch"
end

desc 'Build the site once into _site/'
task :build do
  sh 'bundle exec jekyll build'
end

desc 'Remove _site/ and Jekyll cache'
task :clean do
  sh 'rm -rf _site .jekyll-cache'
end

task default: :serve
