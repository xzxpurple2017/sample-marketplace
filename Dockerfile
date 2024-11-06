FROM node:22-alpine3.19

# Create app directory
ENV APP_HOME=/home/web/marketplace
RUN addgroup -S web && adduser -S web -G web
RUN mkdir -p $APP_HOME && chown -R web:web $APP_HOME
WORKDIR $APP_HOME

# Switch to user
USER web

# Copy package.json and package-lock.json
# Do this before copying the entire codebase to cache the npm install step
COPY --chown=web:web package*.json $APP_HOME/

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY --chown=web:web . $APP_HOME

# Expose the port the app runs on
EXPOSE 4000

# Initialize Prisma client
RUN npx prisma generate

# Start the application
ENTRYPOINT ["npm", "start"]