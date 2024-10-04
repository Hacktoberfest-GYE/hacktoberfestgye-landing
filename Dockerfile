# Use the latest Jekyll image based on Ruby 3.x
FROM jekyll/jekyll:latest

# Set the working directory inside the container
WORKDIR /srv/jekyll

# Copy the Gemfile and Gemfile.lock first to leverage Docker cache
COPY Gemfile Gemfile.lock ./

# Install the project dependencies
RUN gem install bundler:2.3.25 && bundle install

# Copy the rest of the project files
COPY . .

# Expose port 4000 to access the Jekyll site
EXPOSE 4000

# Command to run Jekyll server with file watching and live reload
CMD ["jekyll", "serve", "--watch", "--force_polling", "--host", "0.0.0.0"]