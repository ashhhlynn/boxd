# exit on error
set -o errexit

rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

bundle install
DISABLE_DATABASE_ENVIRONMENT_CHECK=1
bundle exec rails assets:precompile
bundle exec rails assets:clean
bundle exec rails db:migrate

#if you have seeds to run add:
